import delayPromise from '../delayPromise';
import sequentPromisesList from '../sequentPromisesList';

const result = 'result';
const error = new Error('error');

/**
 * promiseResolve
 * @returns {Promise} promiseResolve
 */
const promiseResolve = () => Promise.resolve(result);

/**
 * promiseReject
 * @returns {Promise} promiseReject
 */
const promiseReject = () => Promise.reject(error);

/**
 * Resolve promiseDelayed function
 * @param {number} timeout - Timeout
 * @returns {Promise} promiseDelayed
 */
const resolvePromiseDelayed = timeout => () => delayPromise(timeout).then(() => timeout);

const promisesList = [promiseResolve, promiseReject, promiseResolve];
const emptyPromisesList = [promiseReject, promiseReject];
const delayedPromisesList = [
  promiseResolve,
  resolvePromiseDelayed(10),
  resolvePromiseDelayed(100),
  resolvePromiseDelayed(100)
];

describe('sequentPromisesList', () => {
  it('resolved Promises', () =>
    sequentPromisesList(promisesList).then(({ results, errors }) => {
      expect(results).toEqual([result, result]);
      expect(errors).toEqual([error]);
    }));

  it('rejected Promises', () =>
    sequentPromisesList(emptyPromisesList).then(({ results, errors }) => {
      expect(results).toEqual([]);
      expect(errors).toEqual([error, error]);
    }));

  it('stop Promises sync', () => {
    let active = true;
    const request = sequentPromisesList(delayedPromisesList, () => active);

    active = false;

    return request.then(({ results, errors }) => {
      expect(results).toEqual([]);
      expect(errors.length).toBe(4);
    });
  });

  it('stop Promises async', () => {
    let active = true;
    const request = sequentPromisesList(delayedPromisesList, () => active);

    delayPromise(0).then(() => {
      active = false;
    });

    return request.then(({ results, errors }) => {
      expect(results).toEqual([result, 10]);
      expect(errors.length).toBe(2);
    });
  });
});

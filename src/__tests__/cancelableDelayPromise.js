import cancelableDelayPromise from '../cancelableDelayPromise';
import { isCanceledError } from '../cancelablePromise';

describe('Cancelable delay Promise', () => {
  it('resolved', () =>
    cancelableDelayPromise(100)
      .then(() => true)
      .then(data => expect(data).toBe(true)));

  it('canceled', () => {
    expect.assertions(1);

    const promise = cancelableDelayPromise(100);

    promise.cancel();

    return promise.catch(error => {
      expect(isCanceledError(error)).toBe(true);
    });
  });
});

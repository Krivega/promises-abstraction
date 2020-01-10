import { createErrorCanceled } from './cancelablePromise';

/**
 * The default is can run tasks
 *
 * @returns {boolean} false
 */
const canRunTasksTrue = () => true;

/**
 * sequentPromisesList resolves Promises sequentially.
 *
 * @func
 * @category Function
 *
 * @param {array}    promisesList - Functions returns primises
 * @param {function} canRunTasks  - Function returns true, if need continue run tasks
 *
 * @returns {Propmise} resolved object with arrays of results and errors
 *
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * const fetchUrls = urls.map(url => () => fetch(url))
 *
 * sequentPromisesList(fetchUrls)
 *   .then(({results, errors}) => {
 *     console.log(results);
 *     console.error(errors);
 *    })
 */
const sequentPromisesList = (promisesList, canRunTasks = canRunTasksTrue) =>
  promisesList.reduce(
    (promiseChain, currentTask) =>
      promiseChain.then(({ results, errors }) => {
        let taskPromise;

        if (canRunTasks(currentTask)) {
          taskPromise = currentTask();
        } else {
          taskPromise = Promise.reject(createErrorCanceled(currentTask));
        }

        return taskPromise
          .then(currentResult => ({
            errors,
            results: [...results, currentResult]
          }))
          .catch(currentError => ({
            results,
            errors: [...errors, currentError]
          }));
      }),
    Promise.resolve({ results: [], errors: [] })
  );

export default sequentPromisesList;

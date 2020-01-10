import delayPromise from './delayPromise';
import cancelablePromise from './cancelablePromise';

/**
 * Cancelable delay Promise
 * @param {number} timeout - delay to resolve
 * @returns {Promise} cancelablePromise
 */
export default timeout => cancelablePromise(delayPromise(timeout));

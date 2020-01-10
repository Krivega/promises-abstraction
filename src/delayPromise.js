/**
 * Delay Promise
 * @param {number} timeout - delay to resolve
 * @returns {Promise} Promise resolved by timeout
 */
export default timeout =>
  new Promise(resolve => {
    setTimeout(() => resolve(true), timeout);
  });

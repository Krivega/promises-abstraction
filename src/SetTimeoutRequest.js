/**
 * SetTimeoutRequest
 */
export default class SetTimeoutRequest {
  /**
   * request
   * @param {function} timeoutFunc timeoutFunc
   * @param {number} delay delay
   * @returns {void}
   */
  request(timeoutFunc, delay) {
    this.cancelRequest();
    this.requestID = window.setTimeout(timeoutFunc, delay);
  }

  /**
   * cancelRequest
   * @returns {void}
   */
  cancelRequest() {
    const { requestID } = this;

    if (requestID) {
      window.clearTimeout(requestID);
      this.requestID = null;
    }
  }

  /**
   * requestID setter
   * @param {object} requestID requestID
   * @returns {void}
   */
  set requestID(requestID) {
    this._requestID = requestID;
  }

  /**
   * requestID getter
   * @returns {string} requestID
   */
  get requestID() {
    return this._requestID;
  }

  /**
   * requested getter
   * @returns {boolean} true if request is active
   */
  get requested() {
    return !!this.requestID;
  }
}

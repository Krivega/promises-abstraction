import CancelableRequest from '../CancelableRequest';

let cancelableRequest;

let cancelableRequestErr;

let mockFn;

let mockFnErr;

let arg;

let requestObj;

let requested;

let canceled;

describe('CancelableRequest', () => {
  const error = new Error('error');

  let cancelSubRequest;

  beforeEach(() => {
    jest.resetModules();
    cancelSubRequest = jest.fn();
    mockFn = jest.fn(data => Promise.resolve(data));
    cancelableRequest = new CancelableRequest(mockFn, 'test', cancelSubRequest);
    cancelableRequestErr = new CancelableRequest(mockFnErr);
    mockFnErr = jest.fn(() => Promise.reject(error));
    arg = {};
    requestObj = {};
    requested = true;
    canceled = true;
  });

  it('request resolve', () =>
    cancelableRequest.request(arg).then(data => {
      expect(data).toEqual(arg);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(cancelableRequest._requested).toBe(false);
    }));

  it('request reject', () => {
    expect.assertions(2);

    return cancelableRequestErr.request(arg).catch(data => {
      expect(data).toEqual(error);
      expect(cancelableRequestErr._requested).toBe(false);
    });
  });

  it('cancelRequest no wait request', () => {
    cancelableRequest.request(arg);
    cancelableRequest.cancelRequest();

    expect(cancelableRequest._requested).toEqual(false);
    expect(cancelableRequest._canceled).toEqual(true);
  });

  it('cancelRequest wait request', () =>
    cancelableRequest.request(arg).then(() => {
      cancelableRequest.cancelRequest();

      expect(cancelableRequest._requested).toEqual(false);
      expect(cancelableRequest._canceled).toEqual(false);
    }));

  it('cancelSubRequest', () => {
    cancelableRequest.request(arg);
    cancelableRequest.cancelRequest();

    expect(cancelSubRequest).toHaveBeenCalledTimes(1);
  });

  it('set requestObj', () => {
    cancelableRequest.requestObj = requestObj;

    expect(cancelableRequest._requestObj).toEqual(requestObj);
  });

  it('get requestObj', () => {
    cancelableRequest.requestObj = requestObj;

    expect(cancelableRequest.requestObj).toEqual(requestObj);
  });

  it('set requested', () => {
    cancelableRequest.requested = requested;

    expect(cancelableRequest._requested).toEqual(requested);
  });

  it('get requested', () => {
    cancelableRequest.requested = requested;

    expect(cancelableRequest.requested).toEqual(requested);
  });

  it('set canceled', () => {
    cancelableRequest.canceled = canceled;

    expect(cancelableRequest._canceled).toEqual(canceled);
  });

  it('get canceled', () => {
    cancelableRequest.canceled = canceled;

    expect(cancelableRequest.canceled).toEqual(canceled);
  });
});

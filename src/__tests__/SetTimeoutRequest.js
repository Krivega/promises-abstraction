import SetTimeoutRequest from '../SetTimeoutRequest';

let setTimeoutRequest;
let mockFn;
let requestID = 'requestID';

describe('SetTimeoutRequest', () => {
  beforeEach(() => {
    jest.resetModules();
    setTimeoutRequest = new SetTimeoutRequest();
    mockFn = jest.fn();
    requestID = 'requestID';
    jest.useFakeTimers();
  });

  it('request', () => {
    setTimeoutRequest.requestID = requestID;
    expect(setTimeoutRequest._requestID).toBe(requestID);
    setTimeoutRequest.request(mockFn, 100);
    expect(setTimeoutRequest._requestID).toBe(1);
    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('cancelRequest', () => {
    setTimeoutRequest.requestID = requestID;
    expect(setTimeoutRequest._requestID).toBe(requestID);
    setTimeoutRequest.cancelRequest();
    expect(setTimeoutRequest._requestID).toBe(null);
  });

  it('set requestID', () => {
    setTimeoutRequest.requestID = requestID;
    expect(setTimeoutRequest._requestID).toBe(requestID);
  });

  it('get requestID', () => {
    setTimeoutRequest.requestID = requestID;
    expect(setTimeoutRequest.requestID).toBe(requestID);
  });

  it('get requested', () => {
    setTimeoutRequest.request(mockFn, 100);
    expect(setTimeoutRequest.requested).toBe(true);
  });
});

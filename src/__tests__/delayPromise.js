import delayPromise from '../delayPromise';

describe('delayPromise', () => {
  it('timeout', () => delayPromise(100).then(data => expect(data).toBe(true)));
});

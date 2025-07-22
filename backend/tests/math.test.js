// a small practice test

const { add } = require('../routes/math');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
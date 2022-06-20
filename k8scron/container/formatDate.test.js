const { formatDate } = require('./formatDate');

describe('formatDate', () => {
  it('should format simple dates', () => {
    const d2022_01_01 = new Date(2022, 0, 1);
    const d2022_5_25 = new Date(2022, 4, 25);

    expect(formatDate(d2022_01_01)).toEqual('2022-01-01');
    expect(formatDate(d2022_5_25)).toEqual('2022-05-25');
  });
});

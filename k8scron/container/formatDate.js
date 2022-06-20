const { format } = require('date-fns');

function formatDate(date) {
  return format(date, 'yyyy-MM-dd');
}

formatDate.formatDate = formatDate;
module.exports = formatDate;


const CustomError = require('./CustomError'),
    InvalidStatusCodeError = CustomError('InvalidStatusCodeError');

module.exports = {InvalidStatusCodeError};

// const AppError = require('../utils/appError');

const sendErrorDev = (err, req, res) => {
  console.log(`owibka ${err.message}`);
  console.log(res);
  return res.status(404).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    name: err.name,
  });
};

// const handleCastErrorDB = (err) => {
//   const message = `Invalid ${err.path}: ${err.value}.`;
//   return new AppError(message, 400);
// };

// const handleJWTError = () => {
//   return new AppError('Invalid token, Please log in again!', 401);
// };

// const sendErrorProd = (err, res) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   } else {
//     console.error('ERRROR ', err);
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went very wrong',
//     });
//   }
// };
module.exports = (err, req, res) => {
  return sendErrorDev(err, res);
};

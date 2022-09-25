const NODE_ENV = process.env.NODE_ENV

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
}

const globalErrorHandler = (err, req, res, next) => {
  // if no status code, set it to 500
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; // if status is error, it means some server or ext package error

  if (NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (NODE_ENV === 'production') {
    // if error is operational, send it to the client
    if (err.isOperational) {
      sendErrorProd(err, res);
    } else {
      // if error is not operational, log it to the console
      console.error('ERROR', err);

      // send generic message to the client
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    }
  }
};

export default globalErrorHandler;

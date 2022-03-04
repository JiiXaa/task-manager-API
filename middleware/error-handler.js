const { CustomAPIError } = require('../errors/custom-error');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // return res.status(500).json({ msg: err });
  // if you want to have shorter/custom error message:
  //   return res.status(500).json({ msg: `Something went wrong, try again later` });
  //   err comes from custom created error in tasks controller routes (next(createCustomError())).
  return res
    .status(500)
    .json({ msg: 'Something went wrong, please try again' });
};

module.exports = errorHandler;

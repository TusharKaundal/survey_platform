/**
 * This is a utility function that wraps an async function and returns a new function that catches any errors and passes them to the next middleware.
 * @param {Function} fn - The async function to wrap.
 * @returns {Function} - The wrapped function.
 */
function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

module.exports = { catchAsync };

module.exports = (req, res, next) => {
  if (req.method === 'PUT') {
    req.body.updated = Date.now();
  }
  // Continue to JSON Server router
  next();
};

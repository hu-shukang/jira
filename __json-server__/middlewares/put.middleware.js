module.exports = (req, res, next) => {
  if (req.method === 'PUT') {
    req.body.updateAt = Date.now();
  }
  // Continue to JSON Server router
  next();
};

const notFound = (req, res) =>
  res.status(404).send('Requested route does not exist!');

module.exports = notFound;

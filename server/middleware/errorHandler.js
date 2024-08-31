const errorHandler = (err, req, res, next) => {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

};

module.exports = errorHandler;

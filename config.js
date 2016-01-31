const environment = {
  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,

}, environment);

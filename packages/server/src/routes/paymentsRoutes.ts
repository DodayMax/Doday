const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = app => {
  app.post('/api/stripe', (req, res) => {});
};

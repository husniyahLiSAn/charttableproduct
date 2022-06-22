const ProductHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'product',
  version: '1.0.0',
  register: async (server, { service }) => {
    const productHandler = new ProductHandler(service);
    server.route(routes(productHandler));
  },
};

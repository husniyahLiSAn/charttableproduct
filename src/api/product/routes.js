const routes = (handler) => [
  {
    method: 'GET',
    path: '/products/chart',
    handler: handler.getAllAreaPercentage,
  },
  {
    method: 'GET',
    path: '/products/table',
    handler: handler.getAllBrandPercentage,
  },
  {
    method: 'GET',
    path: '/products/filter',
    handler: handler.getFilterProductHandler,
  },
];

module.exports = routes;

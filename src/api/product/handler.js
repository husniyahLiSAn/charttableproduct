const ClientError = require('../../exceptions/ClientError');

class ProductHandler {
  constructor(service) {
    this._service = service;

    this.getAllAreaPercentage = this.getAllAreaPercentage.bind(this);
    this.getAllBrandPercentage = this.getAllBrandPercentage.bind(this);
    this.getFilterProductHandler = this.getFilterProductHandler.bind(this);
  }

  async getAllAreaPercentage(request, h) {
    const products = await this._service.getAllAreaPercentage();

    return {
      status: 'success',
      data: {
        products,
      },
    };
  }

  async getAllBrandPercentage(request, h) {
    const products = await this._service.getAllBrandPercentage();

    return {
      status: 'success',
      data: {
        products,
      },
    };
  }

  async getFilterProductHandler(request, h) {
    try {
      const { areas = [], dateFrom = '', dateTo = '' } = request.payload;

      const products = await this._service.getFilterProductHandler({ areas, dateFrom, dateTo });

      return {
        status: 'success',
        data: {
          products,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      // Server ERROR!
      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      }).code(500);
    }
  }
}

module.exports = ProductHandler;

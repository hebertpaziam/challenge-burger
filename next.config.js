const path = require('path');
module.exports = {

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
};

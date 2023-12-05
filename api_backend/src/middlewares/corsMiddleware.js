const cors = require('cors');

const corsOptions = {
  origin: ['http://192.168.1.141:8080', 'http://localhost:8080', 'http://192.168.1.97:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(corsOptions);

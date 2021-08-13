"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _productos = _interopRequireDefault(require("./routes/productos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = 8080;
const app = (0, _express.default)();

const viewsPath = _path.default.resolve(__dirname, '../views/pages');

app.set('views', viewsPath);
app.set('view engine', 'ejs');
const server = app.listen(port, () => {
  console.log(`Server running in port:  ${port}`);
});
server.on('error', err => {
  console.error(`There was an error: ${err}`);
});
app.set('json spaces', 2);
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use('/', _productos.default);
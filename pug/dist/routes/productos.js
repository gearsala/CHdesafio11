"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _productClass = _interopRequireDefault(require("../productClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const products = new _productClass.default();
router.get('/', (req, res) => {
  res.render('main');
});
router.get('/productos/vista', (req, res) => {
  res.render('listproducts', {
    layout: 'index',
    products: products.getProducts(),
    productExists: products.getProducts().length === 0 ? false : true
  });
});
router.get('/productos/agregar', (req, res) => {
  res.render('addproducts', {
    layout: 'index'
  });
});
router.get('/productos/listar', (req, res) => {
  const getProducts = products.getProducts();
  getProducts.length !== 0 ? res.json({
    products: getProducts
  }) : res.status(404).json({
    error: 'No hay productos cargados'
  });
});
router.get('/productos/listar/:id', (req, res) => {
  const specificId = req.params.id;
  const getProducts = products.getProducts();
  const product = getProducts.find(product => product.id == specificId);
  product ? res.json({
    product
  }) : res.status(404).json({
    error: 'Producto no encontrado'
  });
});
router.post('/productos/guardar', (req, res) => {
  const body = req.body;
  const newProduct = products.addProduct(body.title, body.price, body.thumbnail);
  res.json({
    product: newProduct
  });
});
router.put('/productos/actualizar/:id', (req, res) => {
  const specificId = req.params.id;
  const body = req.body;
  const updatedProduct = products.updateProduct(specificId, body.title, body.price, body.thumbnail);
  updatedProduct === -1 ? res.status(404).json({
    error: 'Producto no encontrado'
  }) : res.status(201).json({
    product: updatedProduct
  });
});
router.delete('/productos/borrar/:id', (req, res) => {
  const specificId = req.params.id;
  const deletedProduct = products.deleteProduct(specificId);
  deletedProduct === -1 ? res.status(404).json({
    error: 'Producto no encontrado o eliminado'
  }) : res.status(201).json({
    deletedProduct
  });
});
var _default = router;
exports.default = _default;
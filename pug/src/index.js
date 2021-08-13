import express from 'express';
import path from 'path';
import Product from './routes/productos';

const port = 8080;
const app = express();
const viewsPath = path.resolve(__dirname, '../views');

app.set('views', viewsPath)
app.set('view engine', 'pug');

const server = app.listen(port, () => {
	console.log(`Server running in port:  ${port}`);
});

server.on('error', (err) => {
	console.error(`There was an error: ${err}`);
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.set('json spaces', 2);

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use('/', Product);
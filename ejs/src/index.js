import express from 'express';
import path from 'path';
import Product from './routes/productos';

const port = 8080;
const app = express();
const viewsPath = path.resolve(__dirname, '../views/pages');

app.set('views', viewsPath)
app.set('view engine', 'ejs');

const server = app.listen(port, () => {
	console.log(`Server running in port:  ${port}`);
});

server.on('error', (err) => {
	console.error(`There was an error: ${err}`);
});

app.set('json spaces', 2);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/', Product);
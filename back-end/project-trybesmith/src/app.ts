import express from 'express';
import routerProducts from './routes/product.router';
import routerUsers from './routes/user.router';
import routerOrder from './routes/order.router';
import routerLogin from './routes/login.router';

const app = express();

app.use(express.json());

app.use('/products', routerProducts);
app.use('/users', routerUsers);
app.use('/orders', routerOrder);
app.use('/login', routerLogin);

export default app;
const express = require('express');

const { loginRouter, userRouter, categoriesRouter, postRouter } = require('./database/routers');
const { tokenValidation } = require('./database/middlewares');
 
const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

/* app.delete('/user/:id',
  tokenValidation.tokenValidate,
  postController.postExist,
  userController.deleteUser); */
app.use(tokenValidation.error401);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
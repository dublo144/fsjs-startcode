require('dotenv').config();
import express from 'express';
import path from 'path';
import { ApiError } from './errors/apiError';
//Add if needed
//import { requestLogger, errorLogger } from "./middlewares/logger";

const app = express();

app.use(express.static(path.join(process.cwd(), 'public')));

//  Add if needed
//app.use(requestLogger)

app.use(express.json());

//const userAPIRouter = require('./routes/userApi');
const userAPIRouter = require('./routes/userApiDB');

app.get('/api/dummy', (req, res) => {
  res.json({ msg: 'Hello' });
});

app.use('/api/users', userAPIRouter);

//  Add if needed
// app.use(errorLogger)

app.use(function (err: any, req: any, res: any, next: Function) {
  if (err instanceof ApiError) {
    const e = <ApiError>err;
    return res.status(e.errorCode).send({ code: e.errorCode, message: e.message });
  }
  next(err);
});

const PORT = process.env.PORT || 3333;
const server = app.listen(PORT);

console.log(`Server started, listening on port: ${PORT}`);
module.exports.server = server;

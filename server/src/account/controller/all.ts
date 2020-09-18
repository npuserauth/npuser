import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Account from '../Account';

const all: RequestHandler = async (req, res) => {
  const list = await Account.find();
  res.send({ list });
};

export default requestMiddleware(all);

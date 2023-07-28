import { rest } from 'msw';
import * as accountDB from '../data/account';
import { bootstrap } from '../bootstrap';
import { ServerError, withErrorHandler } from '../util';

const getToken = (req) =>
  req.headers.get('Authorization')?.replace('Bearer ', '');

export async function getUser(req) {
  const token = getToken(req);
  if (!token) {
    const error = new ServerError('A token must be provided');
    error.status = 401;
    throw error;
  }
  let userId;
  try {
    userId = atob(token);
  } catch (e) {
    const error = new ServerError('Invalid token. Please login again.');
    error.status = 401;
    throw error;
  }
  return await accountDB.read(+userId);
}

export const userHandlers = [
  rest.get(`/me`, async (req, res, ctx) => {
    const user = await getUser(req);
    const token = getToken(req);
    return res(ctx.json({ user: { ...user, token } }));
  }),
  rest.post(
    `/login`,
    withErrorHandler(async (req, res, ctx) => {
      const { username, password } = await req.json();
      const user = await accountDB.authenticate({ name: username, password });
      return res(ctx.json({ user }));
    })
  ),

  rest.post(
    `/register`,
    withErrorHandler(async (req, res, ctx) => {
      const { username, password } = await req.json();
      const userFields = { name: username, password };
      await accountDB.create(userFields);
      let user;
      try {
        user = await accountDB.authenticate(userFields);
        bootstrap(user.id);
      } catch (error) {
        return res(
          ctx.status(error.status),
          ctx.json({ message: error.message })
        );
      }
      return res(ctx.json({ user }));
    })
  ),
];

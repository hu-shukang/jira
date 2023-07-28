import { rest } from 'msw';

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const { username, password } = await req.json();
    if (username === 'hushukang' && password === '123') {
      return res(ctx.status(200));
    }
    return res(
      ctx.status(400),
      ctx.json({
        message: '用户名或者密码错误！',
      })
    );
  }),
];

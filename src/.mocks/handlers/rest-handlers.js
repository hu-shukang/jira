import { rest } from 'msw';
import { getUser } from './account';
import { taskTypeDB } from '../data/rest';
import { withErrorHandler } from '../util';

const tryToNumber = (value) =>
  Array.isArray(value) ? value.map(Number) : Number(value);

const convertIds = (object) => {
  const result = {};
  Object.keys(object).forEach((key) => {
    // 如果包含Id，比如personId，就要转换成数字
    result[key] = key.includes('Id') ? tryToNumber(object[key]) : object[key];
  });
  result.id = tryToNumber(result.id);
  return result;
};

export const getRestHandlers = (endpoint, db) => {
  return [
    // query list
    rest.get(
      `/${endpoint}`,
      withErrorHandler(async (req, res, ctx) => {
        const user = await getUser(req);
        const params = req.url.searchParams;
        const queryResult = db.queryByOwnerId(
          user.id,
          Object.fromEntries(params)
        );
        return res(ctx.json(queryResult));
      })
    ),
    // query detail
    rest.get(
      `/${endpoint}/:id`,
      withErrorHandler(async (req, res, ctx) => {
        const { id } = req.params;
        const item = db.detail(+id);
        return res(ctx.json(item));
      })
    ),
    // put item
    rest.patch(
      `/${endpoint}/:id`,
      withErrorHandler(async (req, res, ctx) => {
        const { id } = convertIds(req.params);
        const updates = await req.json();
        const updatedItem = db.update(id, updates);
        return res(ctx.json(updatedItem));
      })
    ),

    // remove item
    rest.delete(
      `/${endpoint}/:id`,
      withErrorHandler(async (req, res, ctx) => {
        const { id } = convertIds(req.params);
        db.remove(id);
        return res(ctx.json({ success: true }));
      })
    ),

    // create item
    rest.post(
      `/${endpoint}`,
      withErrorHandler(async (req, res, ctx) => {
        const user = await getUser(req);
        let targetAddItem = Object.assign(req.body, {
          ownerId: user.id,
          created: new Date().getTime(),
        });

        if (endpoint === 'tasks') {
          targetAddItem = {
            ...targetAddItem,
            reporterId: user.id,
            typeId: taskTypeDB.queryByOwnerId(user.id)[0].id,
            created: new Date().getTime(),
          };
        }

        // const nameExist = !!db
        //   .queryByOwnerId(user.id)
        //   .find((item) => item.name === targetAddItem.name);
        // if (nameExist) {
        //   const error = new ServerError("此名字已存在");
        //   error.status = 400;
        //   throw error;
        // }

        const detail = await db.create(convertIds(targetAddItem));
        return res(ctx.json(detail));
      })
    ),
  ];
};

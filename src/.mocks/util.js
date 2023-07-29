export class ServerError extends Error {
  status = 200;

  constructor(message) {
    super(message);
  }
}

export function required(key) {
  const error = new ServerError(`${key} is required`);
  error.status = 400;
  throw error;
}

export const search = (list, query) => {
  if (!query) {
    return list;
  }
  return list.filter((item) => {
    return Object.keys(query).every((queryKey) => {
      const queryValue = query[queryKey];
      if (queryKey === 'name') {
        return item.name.includes(queryValue);
      }

      if (Array.isArray(queryValue)) {
        return queryValue.find((value) => value == item[queryKey]);
      } else {
        if (queryValue === undefined || queryValue === '') {
          return true;
        }
        return item[queryKey] == queryValue;
      }
    });
  });
};

export function withErrorHandler(handler) {
  return async (req, res, ctx) => {
    try {
      return await handler(req, res, ctx);
    } catch (error) {
      console.error('An error occurred:', error);
      const status = error.status || 500;
      return res(
        ctx.delay(randomDelay()),
        ctx.status(status),
        ctx.json({ status, message: error.message || 'Unknown Error' })
      );
    }
  };
}

export function randomDelay() {
  return Math.random() * 2000 + 2000;
}

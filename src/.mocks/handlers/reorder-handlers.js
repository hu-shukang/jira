import { rest } from 'msw';
import { kanbanDB, taskDB } from '../data/rest';
import { withErrorHandler, randomDelay } from '../util';

export const reorderHandlers = [
  rest.post(
    `/kanbans/reorder`,
    withErrorHandler(async (req, res, ctx) => {
      const { fromId, referenceId, type } = await req.json();
      kanbanDB.reorder({ fromId, referenceId, type });
      return res(ctx.delay(randomDelay()), ctx.json({}));
    })
  ),
  rest.post(
    `/tasks/reorder`,
    withErrorHandler(async (req, res, ctx) => {
      const {
        type,
        fromId: fromTaskId,
        referenceId,
        fromKanbanId,
        toKanbanId,
      } = await req.json();
      if (fromKanbanId !== toKanbanId) {
        await taskDB.update(fromTaskId, { kanbanId: toKanbanId });
      }
      taskDB.reorder({ type, fromId: fromTaskId, referenceId });
      return res(ctx.delay(randomDelay()), ctx.json({}));
    })
  ),
];

import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const start = () => {
  // 指定されたリクエストハンドラを持つサービスワーカーを設定する
  const worker = setupWorker(...handlers);
  worker.start({
    onUnhandledRequest: 'bypass',
  });
};

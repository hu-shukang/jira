import { useEffect, useState } from 'react';

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export function useDebounce<T>(value: T, delay = 1000) {
  // debounce の対象 state と setter
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // delay 後 debounce の対象 state をアップデート
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 次の effect が実行される直前に timer キャンセル
    return () => {
      clearTimeout(timer);
    };

    // value、delay がアップデートするたびに effect 実行
  }, [value, delay]);

  // 最終的にアップデートされた state をリターン
  return debouncedValue;
}

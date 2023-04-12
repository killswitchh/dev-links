export function convertToName(value: string): string | undefined {
  if (!value) return;
  const words = value.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
  return capitalizedWords.join(' ');
}

type Procedure = (...args: unknown[]) => void;

export function debounce<T extends Procedure>(func: T, delay: number): T {
  let timerId: ReturnType<typeof setTimeout>;

  const debouncedFunc = function (this: unknown, ...args: unknown[]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return debouncedFunc as any;
}

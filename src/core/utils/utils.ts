import { ButtonShape, ButtonTheme } from '@prisma/client';

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

export function extractStylesFromButton(
  buttonTheme: ButtonTheme,
  buttonShape: ButtonShape,
  buttonColor: string,
  fontColor: string,
  outlineColor: string,
) {
  let border_radius;
  switch (buttonShape) {
    case ButtonShape.PILL:
      border_radius = '35px';
      break;
    case ButtonShape.RECTANGLE:
      border_radius = '0px';
      break;
    case ButtonShape.ROUNDED_RECTANGLE:
      border_radius = '12px';
      break;
  }

  const style = {
    'background-color':
      buttonTheme === ButtonTheme.FILL || buttonTheme === ButtonTheme.SHADOW
        ? buttonColor
        : 'transparent',
    color: fontColor,
    'border-radius': border_radius,
    border: buttonTheme === ButtonTheme.OUTLINE ? `1px solid ${outlineColor}` : 'none',
    'box-shadow': buttonTheme === ButtonTheme.SHADOW ? '5px 10px 8px #888888' : '',
  };

  return style;
}

export function shortenNumber(num: number): string {
  const abbrev = ['K', 'M', 'B', 'T'];
  let index = 0;
  while (num >= 1000 && index < abbrev.length - 1) {
    num /= 1000;
    index++;
  }
  return num.toFixed(0).toString() + abbrev[index];
}

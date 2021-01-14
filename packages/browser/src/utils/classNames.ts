const classNames = (
  ...args: Array<
    | string
    | undefined
    | Array<string>
    | {
        [key: string]: boolean | undefined | null;
      }
  >
): string =>
  args
    .filter(Boolean)
    .map(arg => {
      if (typeof arg === 'string') {
        return arg;
      } else if (Array.isArray(arg)) {
        return arg.join(' ');
      } else if (arg) {
        return Object.entries(arg)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
    })
    .join(' ')
    .replace(/  +/g, ' ');

export default classNames;

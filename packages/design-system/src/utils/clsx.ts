export const clsx = (...args: (string | undefined)[]) => {
  return args.filter(Boolean).join(' ');
};

import type { GenericIssue } from 'valibot';

export const getErrorMessage = (issues: GenericIssue[], field: string) =>
  issues.find((value) => value.message.toLowerCase().includes(field))?.message;

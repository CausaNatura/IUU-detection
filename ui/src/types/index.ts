import { ReactNode } from 'react';

export class ApiError<T> extends Error {
  constructor(
    public statusCode: number,
    public msg: string,
    public data?: T
  ) {
    super();
  }
}
export type WithChildrenProps<T = undefined> = T extends undefined
  ? {
      children?: ReactNode;
    }
  : T & {
      children?: ReactNode;
    };

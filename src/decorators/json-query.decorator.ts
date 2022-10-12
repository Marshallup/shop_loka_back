import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JsonQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const currentQuery = request.query[key];

    if (!currentQuery) {
      return currentQuery;
    }

    try {
      return JSON.parse(currentQuery);
    } catch (error) {
      return currentQuery;
    }
  },
);

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Chat = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return data ? request.body?.[data] : '';
});

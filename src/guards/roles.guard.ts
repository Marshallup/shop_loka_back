import { User } from '@/database/entities/User.entity';
import { USER_ROLES } from '@/enums/roles.enum';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (user.role.name === USER_ROLES.ADMIN) {
      return true;
    }

    return roles.some((role) => role === user.role.name);
  }
}

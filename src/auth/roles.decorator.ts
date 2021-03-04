/**
 * 权限装饰器，该装饰器允许某些角色拥有获取特定资源访问权
 */
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/typings';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export class CreateUserDto {
  user_id?: number;
  username?: string;
  password?: string;
  avatar?: string;
  createTime?: Date;
  updateTime?: Date;
  isAdmin?: boolean;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export enum Action {
  // Manage 所有权限
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

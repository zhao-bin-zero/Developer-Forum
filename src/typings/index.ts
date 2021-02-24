export class CreateUserDto {
  user_id: number;
  username?: string;
  password?: string;
  avatar?: string;
  createTime?: Date;
  updateTime?: Date;
  isAdmin?: boolean;
}

export class Article {
  article_id?: number;
  isPublished?: boolean;
  authorId?: number;
  createTime?: Date;
  updateTime?: Date;
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

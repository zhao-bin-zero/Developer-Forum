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

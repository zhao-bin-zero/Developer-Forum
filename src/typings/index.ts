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

export interface ResponseData {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: object;
  message?: string;
  statusCode: 200 | 301 | 401 | 404 | 500;
}

export interface CreateUserDto {
  id: number;
  username: string;
  password: string;
  age: number;
  roles: string;
  avatar: string;
  createTime?: Date;
  updateTime?: Date;
}

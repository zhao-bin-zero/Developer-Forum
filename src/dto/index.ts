export interface CreateUserDto {
  user_id: number;
  username?: string;
  password?: string;
  roles?: string;
  avatar?: string;
  createTime?: Date;
  updateTime?: Date;
}

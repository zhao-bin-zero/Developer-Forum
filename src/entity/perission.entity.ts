import { Column, Entity, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 许可存储类
 */
@Entity()
export class Perisssion {
  @PrimaryGeneratedColumn()
  perission: number;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }
}

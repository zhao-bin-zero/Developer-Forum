import { Column, Entity, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Perisssion 存储类
 * @class Perisssion
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

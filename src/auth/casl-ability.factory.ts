import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Article } from 'src/entity/article.entity';
import { Action, CreateUserDto } from 'src/typings';

type Subjects =
  | typeof Article
  | typeof CreateUserDto
  | Article
  | CreateUserDto
  | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: CreateUserDto) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user?.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    can(Action.Update, Article, { authorId: user.user_id });
    cannot(Action.Delete, Article, { isPublished: true });

    return build();
  }
}

import { FriendsRepository } from 'src/repositories/friends-repository';
import type { FriendInputDto } from '../../types/friendInputDto';
import { Injectable } from '@nestjs/common';
import { serverError, created, conflict } from 'src/utils/httpResponses';

@Injectable()
export class InsertNewFriendCase {
  constructor(private repository: FriendsRepository) {}

  async insertFriend(friendData: FriendInputDto) {
    const isAnExistingfriend = await this.repository.findByName(
      friendData.name,
    );

    if (isAnExistingfriend) {
      return conflict();
    }

    const createdfriend = await this.repository.insertFriend(friendData);

    if (!createdfriend) {
      return serverError();
    }

    return created(createdfriend);
  }
}

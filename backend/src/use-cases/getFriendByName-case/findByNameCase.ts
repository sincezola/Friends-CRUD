import { Injectable } from '@nestjs/common';
import { FriendsRepository } from 'src/repositories/friends-repository';
import { notFound, OK } from 'src/utils/httpResponses';

@Injectable()
export class GetFriendByNameCase {
  constructor(private readonly repository: FriendsRepository) {}

  async getFriendById(name: string) {
    const searchedFriend = await this.repository.findByName(name);

    if (!searchedFriend) {
      return notFound();
    }

    return OK(searchedFriend);
  }
}

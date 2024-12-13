import { Injectable } from '@nestjs/common';
import { FriendsRepository } from 'src/repositories/friends-repository';
import { OK, serverError } from 'src/utils/httpResponses';

@Injectable()
export class GetAllFriendsCase {
  constructor(private repository: FriendsRepository) {}

  async getFriends() {
    const friends = await this.repository.findAllFriends();

    if (!friends) {
      return serverError();
    }

    return OK(friends);
  }
}

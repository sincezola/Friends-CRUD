import { Injectable } from '@nestjs/common';
import { FriendsRepository } from 'src/repositories/friends-repository';
import { notFound, OK } from 'src/utils/httpResponses';

@Injectable()
export class GetFriendByIdCase {
  constructor(private repository: FriendsRepository) {}

  async getFriendById(id: number) {

    const searchedfriend = await this.repository.findById(id);

    if (!searchedfriend) {
      return notFound();
    }

    return OK(searchedfriend);
  }
}

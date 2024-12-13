import { Injectable } from '@nestjs/common';
import { FriendsRepository } from 'src/repositories/friends-repository';
import { notFound, OK } from 'src/utils/httpResponses';

@Injectable()
export class DeleteFriendCase {
  constructor(private repository: FriendsRepository) {}

  async deleteFriend(id: number) {
    const isAnExistingfriend = await this.repository.findById(id);

    if (!isAnExistingfriend) {
      return notFound();
    }

    const deletedfriend = await this.repository.deleteFriend(id);

    if (!deletedfriend) {
      return notFound();
    }

    return OK(deletedfriend);
  }
}

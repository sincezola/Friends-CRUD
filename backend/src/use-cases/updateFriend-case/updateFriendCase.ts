import { Injectable } from '@nestjs/common';
import { FriendsRepository } from 'src/repositories/friends-repository';
import type { UpdateFriendDto } from 'src/types/updateFriendDto';
import { notFound, OK } from 'src/utils/httpResponses';

@Injectable()
export class UpdateFriendCase {
  constructor(private repository: FriendsRepository) {}

  async updateFriend(id: number, props: UpdateFriendDto) {
    const isThisAnExistingFriend = await this.repository.findById(id);

    if (!isThisAnExistingFriend) {
      return notFound();
    }

    const updatedfriend = await this.repository.updateFriend(id, props);

    return OK(updatedfriend);
  }
}

import type { Friend } from 'src/entities/Friend/Friend';
import type { FriendInputDto } from 'src/types/friendInputDto';
import type { UpdateFriendDto } from 'src/types/updateFriendDto';

export abstract class RepositoryProtocol {
  abstract findAllFriends(): Promise<Friend[]>;
  abstract findById(id: number): Promise<Friend | null>;
  abstract findByName(name: string): Promise<Friend | null>;
  abstract insertFriend(friendData: FriendInputDto): Promise<Friend>;
  abstract deleteFriend(id: number): Promise<Friend>;
  abstract updateFriend(
    id: number,
    friendData: UpdateFriendDto,
  ): Promise<Friend>;
}

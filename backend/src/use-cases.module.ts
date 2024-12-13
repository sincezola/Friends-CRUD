import { Module, forwardRef } from '@nestjs/common';
import { InsertNewFriendCase } from './use-cases/insertNewFriend-case/insertNewFriend-case';
import { GetFriendByIdCase } from './use-cases/getFriendById-case/findByIdCase';
import { GetFriendByNameCase } from './use-cases/getFriendByName-case/findByNameCase';
import { GetAllFriendsCase } from './use-cases/getAllFriends-case/getAllFriendsCase';
import { DeleteFriendCase } from './use-cases/deleteFriend-case/delete-friend-case';
import { AppModule } from './app.module';
import { UpdateFriendCase } from './use-cases/updateFriend-case/updateFriendCase';

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [
    InsertNewFriendCase,
    GetFriendByIdCase,
    GetAllFriendsCase,
    DeleteFriendCase,
    UpdateFriendCase,
    GetFriendByNameCase,
  ],
  exports: [
    InsertNewFriendCase,
    GetFriendByIdCase,
    GetAllFriendsCase,
    DeleteFriendCase,
    UpdateFriendCase,
    GetFriendByNameCase,
  ],
})
export class UseCasesModule {}

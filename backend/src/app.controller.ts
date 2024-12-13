import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { GetFriendByIdCase } from './use-cases/getFriendById-case/findByIdCase';
import { GetAllFriendsCase } from './use-cases/getAllFriends-case/getAllFriendsCase';
import { InsertNewFriendCase } from './use-cases/insertNewFriend-case/insertNewFriend-case';
import { FriendInputDto } from './types/friendInputDto';
import { UpdateFriendDto } from './types/updateFriendDto';
import { FriendQueryDto } from './types/friendQueryDto';
import { DeleteFriendCase } from './use-cases/deleteFriend-case/delete-friend-case';
import { UpdateFriendCase } from './use-cases/updateFriend-case/updateFriendCase';
import { GetFriendByNameCase } from './use-cases/getFriendByName-case/findByNameCase';
import type { Response } from 'express';
import type { httpResponse } from './types/responseType';

@ApiTags('Friends')
@Controller('/sinz')
export class AppController {
  constructor(
    private readonly getAllFriendsCase: GetAllFriendsCase,
    private readonly getFriendByIdCase: GetFriendByIdCase,
    private readonly getFriendByNameCase: GetFriendByNameCase,
    private readonly insertNewFriendCase: InsertNewFriendCase,
    private readonly deleteFriendCase: DeleteFriendCase,
    private readonly updateFriendCase: UpdateFriendCase,
  ) {}

  @Get('/friends')
  @ApiOperation({ summary: 'Get all friends' })
  @ApiResponse({
    status: 200,
    description: 'Returns all friends.',
  })
  async getFriends(@Res() res: Response): Promise<Response> {
    const friends = await this.getAllFriendsCase.getFriends();
    const { statusCode, body } = friends;
    return res.status(statusCode).json(body);
  }

  @Get('/friend')
  @ApiOperation({ summary: 'Search friend by ID or Name' })
  @ApiQuery({
    name: 'id',
    required: false,
    type: Number,
    description: 'Friend ID to search by.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Friend name to search by.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the friend details.',
  })
  @ApiResponse({
    status: 404,
    description: 'Friend not found.',
  })
  async getByQuery(
    @Res() res: Response,
    @Query(new ValidationPipe({ transform: true })) query: FriendQueryDto,
  ): Promise<Response> {
    let searchedFriend: httpResponse<any>;
    const { id, name } = query;

    if (id) {
      searchedFriend = await this.getFriendByIdCase.getFriendById(id);
    } else if (name) {
      searchedFriend = await this.getFriendByNameCase.getFriendById(name);
    } else {
      return res
        .status(400)
        .json({ message: 'Either id or name must be provided.' });
    }

    const { statusCode, body } = searchedFriend;
    return res.status(statusCode).json(body);
  }

  @Post('/new-friend')
  @ApiOperation({ summary: 'Create a new friend' })
  @ApiResponse({
    status: 201,
    description: 'Friend created successfully.',
  })
  async createFriend(
    @Body() bodyReq: FriendInputDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { name, friendLevel, fatLevel } = bodyReq;
    const createdFriend = await this.insertNewFriendCase.insertFriend({
      name,
      friendLevel,
      fatLevel,
    });
    const { statusCode, body } = createdFriend;
    return res.status(statusCode).json(body);
  }

  @Delete('/delete-friend/:id')
  @ApiOperation({ summary: 'Delete a friend by ID' })
  @ApiParam({
    name: 'id',
    description: 'Friend ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Friend deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Friend not found.',
  })
  async deleteFriend(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const deletedFriend = await this.deleteFriendCase.deleteFriend(id);
    const { statusCode, body } = deletedFriend;
    return res.status(statusCode).json(body);
  }

  @Patch('patch-friend/:id')
  @ApiOperation({ summary: 'Update friend details' })
  @ApiParam({
    name: 'id',
    description: 'Friend ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Friend updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Friend not found.',
  })
  async patchFriend(
    @Param('id') id: number,
    @Body() bodyReq: UpdateFriendDto,
    @Res() res: Response,
  ): Promise<Response> {
    const updatedFriend = await this.updateFriendCase.updateFriend(id, bodyReq);
    const { statusCode, body } = updatedFriend;
    return res.status(statusCode).json(body);
  }
}

import { Injectable } from '@nestjs/common';
import type { RepositoryProtocol } from './repository-protocol';
import { Friend, type friendData } from 'src/entities/Friend/Friend';
import { PrismaService } from 'src/infra/database/prisma/PrismaService';
import type { UpdateFriendDto } from 'src/types/updateFriendDto';

@Injectable()
export class FriendsRepository implements RepositoryProtocol {
  constructor(private readonly prisma: PrismaService) {}

  async findAllFriends(): Promise<Friend[]> {
    try {
      const friends = await this.prisma.friends.findMany({
        select: {
          id: true,
          name: true,
          friendLevel: true,
          fatLevel: true,
          created_at: true,
        },
      });

      return friends.map(
        (friend) =>
          new Friend({
            id: friend.id,
            name: friend.name,
            friendLevel: friend.friendLevel,
            fatLevel: friend.fatLevel,
            created_at: friend.created_at,
          }),
      );
    } catch (error) {
      throw new Error(`Erro ao buscar amigos: ${error.message}`);
    }
  }

  async findById(id: number): Promise<Friend | null> {
    try {
      const friend = await this.prisma.friends.findFirst({
        where: {
          id,
        },
      });

      if (!friend) {
        return null;
      }

      return new Friend(friend);
    } catch (error) {
      throw new Error(`Erro ao buscar amigos: ${error.message}`);
    }
  }

  async findByName(name: string): Promise<Friend | null> {
    try {
      const friend = await this.prisma.friends.findFirst({
        where: {
          name,
        },
      });

      if (!friend) {
        return null;
      }

      return new Friend(friend);
    } catch (error) {
      throw new Error(`Error on find Friend : ${error.message}`);
    }
  }

  async insertFriend(friendData: friendData): Promise<Friend> {
    try {
      const { name, friendLevel, fatLevel } = friendData;

      const newFriend = await this.prisma.friends.create({
        data: {
          name,
          friendLevel,
          fatLevel,
        },
        select: {
          id: true, // `id` agora é do tipo `number`
          name: true,
          friendLevel: true,
          fatLevel: true,
          created_at: true,
        },
      });

      if (!newFriend) {
        throw new Error('Error on insert Friend.');
      }

      return new Friend(newFriend);
    } catch (error) {
      throw new Error(`Error on insert Friend: ${error.message}`);
    }
  }

  async deleteFriend(id: number): Promise<Friend> {
    // Alterar para `number`
    try {
      const deletedFriend = await this.prisma.friends.delete({
        where: { id },
      });

      return new Friend(deletedFriend);
    } catch (error) {
      throw new Error(
        `Error on delete friend with ID: ${id}: ${error.message}`,
      );
    }
  }

  async updateFriend(id: number, props: UpdateFriendDto): Promise<Friend> {
    // Alterar para `number`
    try {
      const data = Object.entries(props).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>,
      );

      const updatedFriend = await this.prisma.friends.update({
        where: { id },
        data,
      });

      return new Friend(updatedFriend);
    } catch (error) {
      throw new Error(`Error on patch Friend with ID: ${id}: ${error.message}`);
    }
  }
}

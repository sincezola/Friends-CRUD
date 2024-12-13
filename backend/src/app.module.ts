import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './infra/database/prisma/PrismaService';
import { FriendsRepository } from './repositories/friends-repository';
import { UseCasesModule } from './use-cases.module';

@Module({
  imports: [forwardRef(() => UseCasesModule)],
  controllers: [AppController],
  providers: [FriendsRepository, PrismaService],
  exports: [FriendsRepository],
})
export class AppModule {}

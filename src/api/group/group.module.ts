import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ShareModule } from './../../share/share.module';
import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';

@Module({
    imports: [MulterModule, ShareModule],
    controllers: [GroupController],
    providers: [GroupRepository],
    exports: [GroupRepository],
})
export class GroupModule {}

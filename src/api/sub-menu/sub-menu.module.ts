import { Module } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { SubMenuController } from './sub-menu.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ShareModule } from 'src/share/share.module';

@Module({
    imports: [MulterModule, ShareModule],
    controllers: [SubMenuController],
    providers: [SubMenuService],
    exports: [SubMenuService],
})
export class SubMenuModule {}

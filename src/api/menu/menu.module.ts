import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ShareModule } from './../../share/share.module';

@Module({
    imports: [MulterModule, ShareModule],
    controllers: [MenuController],
    providers: [MenuService],
    exports: [MenuService],
})
export class MenuModule {}

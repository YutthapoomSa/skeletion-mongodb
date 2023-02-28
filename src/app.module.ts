import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/user/user.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { LogService } from './services/log.service';
import { ShareModule } from './share/share.module';
import { GroupModule } from './api/group/group.module';
import { MenuModule } from './api/menu/menu.module';
import { RoleModule } from './api/role/role.module';
import { MenuModule } from './api/menu/menu.module';

@Module({
    imports: [
        ShareModule,
        ConfigModule,
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
        }),
        UserModule,
        GroupModule,
        MenuModule,
        RoleModule,
    ],
    controllers: [],
    providers: [LogService],
})
export class AppModule {}

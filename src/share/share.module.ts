import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { MenuDB, MenuSchema, SubMenuDB, SubMenuSchema } from './../entities/menu.entity';
import { ConfigService } from './../config/config.service';
import { UserDB, UserRoleDB, UserRoleSchema, UserSchema } from './../entities/user.entity';
import { EncryptionService } from './../services/encryption.service';
import { FlexMassageTemplateNo1Service } from './../services/flex-massage-template-no1.service';
import { PaginationService } from './../services/pagination.service';
import { ThirdPartyLineService } from './../services/third-party-line.service';
import { GroupDB } from './../entities/group.entity';
import { GroupSchema } from './../entities/group.entity';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserDB.name, schema: UserSchema, discriminators: [{ name: UserRoleDB.name, schema: UserRoleSchema }] },
            { name: MenuDB.name, schema: MenuSchema, discriminators: [{ name: SubMenuDB.name, schema: SubMenuSchema }] },
            { name: GroupDB.name, schema: GroupSchema },
        ]),

        HttpModule.register({
            timeout: 60000,
        }),
    ],
    providers: [EncryptionService, ConfigService, ThirdPartyLineService, FlexMassageTemplateNo1Service, PaginationService, MulterModule],
    exports: [
        EncryptionService,
        ConfigService,
        MongooseModule,
        HttpModule,
        ThirdPartyLineService,
        FlexMassageTemplateNo1Service,
        PaginationService,
        MulterModule,
    ],
})
export class ShareModule {}

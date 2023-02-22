import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from './../config/config.service';
import { UserDB, UserSchema } from './../entities/user.entity';
import { EncryptionService } from './../services/encryption.service';
import { FlexMassageTemplateNo1Service } from './../services/flex-massage-template-no1.service';
import { PaginationService } from './../services/pagination.service';
import { ThirdPartyLineService } from './../services/third-party-line.service';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserDB.name, schema: UserSchema },
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

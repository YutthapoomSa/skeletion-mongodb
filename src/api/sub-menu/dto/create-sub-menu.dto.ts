import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ResStatus } from 'src/share/enum/res-status.enum';
import { SubMenuDB } from './../../../entities/sub-menu.entity';

export class CreateSubMenuReqDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nameSubmenu: string;

    @ApiProperty()
    @IsString()
    iframe: string;

    @ApiProperty()
    @IsString()
    ExternalLink: string;

    @ApiProperty()
    @IsString()
    InternalLink: string;
}

export class CreateSubMenuDTOData {
    @ApiProperty()
    id: ObjectId;
    @ApiProperty()
    nameSubmenu: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty()
    ExternalLink: string;
    @ApiProperty()
    InternalLink: string;
}

export class CreateSubmenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateSubMenuDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateSubMenuDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateSubMenuDTOData();
        // const config = new ConfigService();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.nameSubmenu = datas.nameSubmenu;
            this.resData.iframe = datas.iframe;
            this.resData.ExternalLink = datas.ExternalLink;
            this.resData.InternalLink = datas.InternalLink;
        }
    }
}

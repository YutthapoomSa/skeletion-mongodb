import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { MenuDB } from './../../../entities/menu.entity';

export class SubMenuDataDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nameSubmenu: string;

    @ApiProperty()
    @IsString()
    iframe?: string;

    @ApiProperty()
    @IsString()
    ExternalLink?: string;

    @ApiProperty()
    @IsString()
    InternalLink?: string;
}

export class CreateMenuReqDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: [SubMenuDataDTO],
    })
    @IsOptional()
    @IsArray()
    subMenuList: SubMenuDataDTO[];
}
// ─────────────────────────────────────────────────────────────────────────────

export class CreateMenuResDTOData {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({
        type: [SubMenuDataDTO],
    })
    @IsArray()
    subMenuList: SubMenuDataDTO[];
}

// ─────────────────────────────────────────────────────────────────────────────

export class CreateMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateMenuResDTOData();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.name = datas.name;
            this.resData.subMenuList = [];

            if (!!datas.subMenuList && datas.subMenuList.length > 0) {
                for (const iterator of datas.subMenuList) {
                    const _subMenuList = new SubMenuDataDTO();
                    _subMenuList.nameSubmenu = iterator.nameSubmenu;
                    _subMenuList.iframe = iterator.iframe ? iterator.iframe : null;
                    _subMenuList.ExternalLink = iterator.ExternalLink ? iterator.ExternalLink : null;
                    _subMenuList.InternalLink = iterator.InternalLink ? iterator.InternalLink : null;
                    this.resData.subMenuList.push(_subMenuList);
                }
            }
        }
    }
}

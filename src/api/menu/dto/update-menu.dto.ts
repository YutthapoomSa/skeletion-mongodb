import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { ObjectId } from 'mongoose';
import { MenuDB } from 'src/entities/menu.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';

export class UpdateMenuReqDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsArray()
    subMenuList: string[];
}

// ─────────────────────────────────────────────────────────────────────────────

export class submenuData {
    @ApiProperty()
    id: ObjectId;
    @ApiProperty()
    subMenuName: string;
    @ApiProperty()
    iframe: string;
    @ApiProperty()
    ExternalLink: string;
    @ApiProperty()
    InternalLink: string;
}

export class UpdateMenuResDTOData {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({
        type: () => [submenuData],
    })
    subMenuList: submenuData[];
}

export class UpdateMenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateMenuResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateMenuResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateMenuResDTOData();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.name = datas.name;
            this.resData.subMenuList = [];

            if (!!datas.subMenuList && datas.subMenuList.length > 0) {
                for (const iterator of this.resData.subMenuList) {
                    const _subMenu = new submenuData();
                    _subMenu.id = iterator.id;
                    _subMenu.subMenuName = iterator.subMenuName;
                    _subMenu.iframe = iterator.iframe;
                    _subMenu.ExternalLink = iterator.ExternalLink;
                    _subMenu.InternalLink = iterator.InternalLink;
                    this.resData.subMenuList.push(_subMenu);
                }
            }
        }
    }
}

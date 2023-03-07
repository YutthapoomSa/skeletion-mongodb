import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ResStatus } from './../../../share/enum/res-status.enum';
import { MenuDB } from './../../../entities/menu.entity';

export class submenuData {
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

export class findOneMenuDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty({
        type: [submenuData],
    })
    subMenuList: submenuData[];
}

export class findOneMenuDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => findOneMenuDTOData,
        description: 'ข้อมูล',
    })
    resData: findOneMenuDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new findOneMenuDTOData();

        if (!!datas) {
            this.resData.id = datas.id;
            this.resData.name = datas.name;
            this.resData.subMenuList = [];

            if (!!this.resData.subMenuList && this.resData.subMenuList.length > 0) {
                for (const iterator of this.resData.subMenuList) {
                    const _subMenu = new submenuData();
                    _subMenu.id = iterator.id;
                    _subMenu.nameSubmenu = iterator.nameSubmenu;
                    _subMenu.iframe = iterator.iframe;
                    _subMenu.ExternalLink = iterator.ExternalLink;
                    _subMenu.InternalLink = iterator.InternalLink;
                    this.resData.subMenuList.push(_subMenu);
                }
            }
        }
    }
}

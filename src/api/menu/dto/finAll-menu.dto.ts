import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { MenuDB } from 'src/entities/menu.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';

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

export class findAllMenuDTOData {
    @ApiProperty()
    id: ObjectId;
    @ApiProperty()
    name: string;
    @ApiProperty({ type: [submenuData] })
    subMenuList: submenuData[];
}

export class findAllMenuDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [findAllMenuDTOData],
        description: 'ข้อมูล',
    })
    resData: findAllMenuDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: MenuDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];

        if (!!datas) {
            for (const iterator of datas) {
                const _menu = new findAllMenuDTOData();
                _menu.id = iterator.id;
                _menu.name = iterator.name;
                _menu.subMenuList = [];

                if (!!_menu.subMenuList && _menu.subMenuList.length > 0) {
                    for (const iterator2 of _menu.subMenuList) {
                        const _submenu = new submenuData();
                        _submenu.id = iterator2.id;
                        _submenu.nameSubmenu = iterator2.nameSubmenu;
                        _submenu.iframe = iterator2.iframe;
                        _submenu.ExternalLink = iterator2.ExternalLink;
                        _submenu.InternalLink = iterator2.InternalLink;
                        _menu.subMenuList.push(_submenu);
                    }
                    this.resData.push(_menu);
                }
            }
        }
    }
}

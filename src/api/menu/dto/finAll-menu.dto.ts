import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { MenuDB } from 'src/entities/menu.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';
export class findAllMenuDTOData {
    @ApiProperty()
    id: ObjectId;
    @ApiProperty()
    name: string;
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
            }
        }
    }
}

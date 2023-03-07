import { ApiProperty } from '@nestjs/swagger';
import { GroupDB } from 'src/entities/group.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';

export class FindOneResDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    groupName: string;
}

export class FindOneResDTO{
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindOneResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindOneResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: GroupDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindOneResDTOData();
        // const config = new ConfigService();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.groupName = datas.groupName;
        }
    }
}

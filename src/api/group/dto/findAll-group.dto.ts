import { ApiProperty } from '@nestjs/swagger';
import { GroupDB } from 'src/entities/group.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';

export class FindAllGroupDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    groupName: string;
}

export class FindAllGroupDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [FindAllGroupDTOData],
        description: 'ข้อมูล',
    })
    resData: FindAllGroupDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: GroupDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];
        // const config = new ConfigService();

        if (!!datas) {
            for (const iterator of datas) {
                const _group = new FindAllGroupDTOData();
                _group.id = iterator.id;
                _group.groupName = iterator.groupName;
                this.resData.push(_group);
            }
        }
    }
}

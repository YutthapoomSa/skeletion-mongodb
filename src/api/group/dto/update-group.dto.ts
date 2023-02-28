import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GroupDB } from 'src/entities/group.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';

export class UpdateGroupReqDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    groupName: string;
}

export class UpdateGroupResDTOData {
    @ApiProperty()
    id: string;
    @ApiProperty()
    groupName: string;
}

export class UpdateGroupResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateGroupResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateGroupResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: GroupDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateGroupResDTOData();
        // const config = new ConfigService();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.groupName = datas.groupName;
        }
    }
}

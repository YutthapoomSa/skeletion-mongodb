import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GroupDB } from './../../../entities/group.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class CreateGroupDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    groupName: string;
}

export class CreateGroupResDTOData {
    @ApiProperty()
    id: string;

    @ApiProperty()
    groupName: string;
}

export class CreateGroupResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateGroupResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateGroupResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: GroupDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateGroupResDTOData();
        // const config = new ConfigService();

        this.resData.id = datas._id;
        this.resData.groupName = datas.groupName;
    }
}

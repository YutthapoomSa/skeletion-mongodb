import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { RoleDB } from 'src/entities/role.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';

export class FindOneRoleResDTOData {
    @ApiProperty()
    _id: ObjectId;
    @ApiProperty()
    roleName: string;
}

export class FindOneRoleResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => FindOneRoleResDTOData,
        description: 'ข้อมูล',
    })
    resData: FindOneRoleResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: RoleDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new FindOneRoleResDTOData();
        // const config = new ConfigService();

        if (!!datas) {
            this.resData._id = datas._id;
            this.resData.roleName = datas.roleName;
        }
    }
}

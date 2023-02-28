import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { RoleDB } from 'src/entities/role.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';

export class UpdateRoleReqDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    roleName: string;
}

export class UpdateRoleResDTOData {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    roleName: string;
}

export class UpdateRoleResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateRoleResDTOData,
        description: 'ข้อมูล',
    })
    resData: UpdateRoleResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: RoleDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateRoleResDTOData();
        // const config = new ConfigService();

        if (!!datas) {
            this.resData._id = datas._id;
            this.resData.roleName = datas.roleName;
        }
    }
}

import { ApiProperty } from '@nestjs/swagger';
import { RoleDB } from 'src/entities/role.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';

export class FindAllRoleResDTOData {
    @ApiProperty()
    _id: string;
    @ApiProperty()
    roleName: string;
}

export class FindAllRoleResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => [FindAllRoleResDTOData],
        description: 'ข้อมูล',
    })
    resData: FindAllRoleResDTOData[];

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: RoleDB[]) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = [];
        // const config = new ConfigService();

        if (!!datas) {
            for (const iterator of datas) {
                const _data = new FindAllRoleResDTOData();
                _data._id = iterator._id;
                _data.roleName = iterator.roleName;
                this.resData.push(_data);
            }
        }
    }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { RoleDB } from 'src/entities/role.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';
import { ObjectId } from 'mongoose';

export class GroupUserData {
    @ApiProperty()
    groupId: string;
}

export class CreateRoleReqDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    roleName: string;

    @ApiProperty({
        type: () => [GroupUserData],
    })
    @IsArray()
    groupList: GroupUserData[];
}
// ─────────────────────────────────────────────────────────────────────────────
class GroupUserResData {
    @ApiProperty()
    _id: ObjectId;
    @ApiProperty()
    groupName: string;
}
export class CreateRoleResDTOData {
    @ApiProperty()
    _id: ObjectId;
    @ApiProperty()
    roleName: string;
    @ApiProperty({
        type: () => [GroupUserResData],
    })
    @IsArray()
    groupList: GroupUserResData[];
}

export class CreateRoleResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => CreateRoleResDTOData,
        description: 'ข้อมูล',
    })
    resData: CreateRoleResDTOData;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: RoleDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new CreateRoleResDTOData();
        // const config = new ConfigService();

        if (!!datas) {
            this.resData._id = datas._id;
            this.resData.roleName = datas.roleName;
            this.resData.groupList = [];

            if (!!this.resData.groupList && this.resData.groupList.length > 0) {
                for (const iterator of this.resData.groupList) {
                    const _group = new GroupUserResData();
                    _group._id = datas._id;
                    _group.groupName = iterator.groupName;
                    this.resData.groupList.push(_group);
                }
            }
        }
    }
}

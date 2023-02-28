import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';
import { ConfigService } from './../../../config/config.service';
import { UserDB } from './../../../entities/user.entity';
import { ResStatus } from './../../../share/enum/res-status.enum';

export class UpdateUserReqDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty()
    imageUser: string;
}

export class UpdateUserResDTOData {
    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;
   
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    imageUser: string;
}

export class UpdateUserResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateUserResDTOData,
        description: 'ข้อมูล',
    })
    resData: any;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: UserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateUserResDTOData();
        const config = new ConfigService();

        if (!!datas) {
            this.resData.id  = datas._id;
            this.resData.username = datas.username;
            this.resData.email = datas.email;
            this.resData.password = datas.password;
            this.resData.phoneNumber = datas.phoneNumber;
            this.resData.imageUser = datas.imageUser ? config.imagePath().userProfileImagePath + '/' + datas.imageUser : '';
        }
    }
}

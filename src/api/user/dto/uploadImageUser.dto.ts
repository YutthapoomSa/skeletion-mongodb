import { ApiProperty } from "@nestjs/swagger";
import { ConfigService } from "src/config/config.service";
import { UserDB } from "src/entities/user.entity";
import { ResStatus } from "src/share/enum/res-status.enum";

export class UploadUserImageDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userImagePath: string;
}

export class UploadUserImageDtoRes {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UploadUserImageDto,
        description: 'ข้อมูล',
    })
    resData: UploadUserImageDto;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, data: UserDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UploadUserImageDto();
        const config = new ConfigService();

        console.log('data', JSON.stringify(data, null, 2));

        if (!!data) {
            this.resData.id = data.id;
            this.resData.userImagePath = data.imageUser ? config.imagePathOut().userProfile + '/' + data.imageUser : '';
        }
    }
}
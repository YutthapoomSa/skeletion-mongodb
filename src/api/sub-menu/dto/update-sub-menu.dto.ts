import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SubMenuDB } from 'src/entities/sub-menu.entity';
import { ResStatus } from 'src/share/enum/res-status.enum';
import { CreateSubMenuDTOData, CreateSubMenuReqDTO } from './create-sub-menu.dto';

export class UpdateSubMenuDto extends PartialType(CreateSubMenuReqDTO) {}

export class UpdateSubMenuResDTO extends PartialType(CreateSubMenuDTOData) {}

export class CreateSubmenuResDTO {
    @ApiProperty({
        enum: Object.keys(ResStatus).map((k) => ResStatus[k]),
        description: 'รหัสสถานะ',
    })
    resCode: ResStatus;

    @ApiProperty({
        type: () => UpdateSubMenuResDTO,
        description: 'ข้อมูล',
    })
    resData: UpdateSubMenuResDTO;

    @ApiProperty({
        description: 'ข้อความอธิบาย',
    })
    msg: string;

    constructor(resCode: ResStatus, msg: string, datas: SubMenuDB) {
        this.resCode = resCode;
        this.msg = msg;
        this.resData = new UpdateSubMenuResDTO();
        // const config = new ConfigService();

        if (!!datas) {
            this.resData.id = datas._id;
            this.resData.nameSubmenu = datas.nameSubmenu;
            this.resData.iframe = datas.iframe;
            this.resData.ExternalLink = datas.ExternalLink;
            this.resData.InternalLink = datas.InternalLink;
        }
    }
}

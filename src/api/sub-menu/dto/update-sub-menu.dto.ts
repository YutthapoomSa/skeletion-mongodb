import { PartialType } from '@nestjs/swagger';
import { CreateSubMenuReqDTO } from './create-sub-menu.dto';

export class UpdateSubMenuDto extends PartialType(CreateSubMenuReqDTO) {}

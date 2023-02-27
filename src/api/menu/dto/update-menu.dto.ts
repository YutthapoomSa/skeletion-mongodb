import { PartialType } from '@nestjs/swagger';
import { CreateMenuReqDTO } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuReqDTO) {}

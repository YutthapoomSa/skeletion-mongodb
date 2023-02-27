import { Body, Controller, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogService } from './../../services/log.service';
import { CreateMenuResDTO, CreateMenuReqDTO } from './dto/create-menu.dto';
import { User } from './../../share/decorator/user.decorator';
import { UserDB } from './../../entities/user.entity';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    private logger = new LogService(MenuController.name);
    constructor(private readonly menuService: MenuService) {}

    // ─────────────────────────────────────────────────────────────

    @Post('createMenu')
    @ApiOperation({ summary: 'สร้างข้อมูลรายการเมนู' })
    @ApiOkResponse({ type: CreateMenuResDTO })
    async CreateMenu(@User() user: UserDB, @Body() body: CreateMenuReqDTO) {
        return await this.menuService.createMenu(user, body);
    }
}

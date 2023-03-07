import { Body, Controller, Post } from '@nestjs/common';
import { Get, Param } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDB } from './../../entities/user.entity';
import { LogService } from './../../services/log.service';
import { User } from './../../share/decorator/user.decorator';
import { CreateMenuReqDTO, CreateMenuResDTO } from './dto/create-menu.dto';
import { MenuService } from './menu.service';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
    private logger = new LogService(MenuController.name);
    constructor(private readonly menuService: MenuService) {}

    // ─────────────────────────────────────────────────────────────

    @Post('createMenu')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'สร้างข้อมูลรายการเมนู' })
    @ApiOkResponse({ type: CreateMenuResDTO })
    async CreateMenu(@User() user: UserDB, @Body() body: CreateMenuReqDTO) {
        return await this.menuService.createMenu(user, body);
    }

    // Todo Fix bug uodateMenu─────────────────────────────────────────────────────────────────────
    // @Patch('/updateMenuByMenuID/:_id')
    // // @ApiBearerAuth()
    // // @UseGuards(AuthGuard('jwt'))
    // async updateMenu(@User() user: UserDB, @Param('_id') _id: string, @Body() body: UpdateMenuReqDTO) {
    //     return await this.menuService.updateMenu(_id, body);
    // }

    @Get('findAllMenu')
    async findAllMenu() {
        return await this.menuService.findAllMenu();
    }

    @Get('findOneMenu/:_id')
    async findOneMenu(@Param('_id') _id: string) {
        return await this.menuService.findOneMenu(_id);
    }

    @Get('/getMenuById/:id')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async getCompanyById(@Param('id') id: string) {
        return await this.menuService.getMenuById(`${id}`);
    }
}

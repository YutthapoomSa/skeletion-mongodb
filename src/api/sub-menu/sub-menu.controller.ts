import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubMenuReqDTO } from './dto/create-sub-menu.dto';
import { SubMenuService } from './sub-menu.service';

@ApiTags('submenu')
@Controller('sub-menu')
export class SubMenuController {
    constructor(private readonly subMenuService: SubMenuService) {}

    @Post('createSubMenu')
    async create(@Body() body: CreateSubMenuReqDTO) {
        return this.subMenuService.create(body);
    }

    @Get('findOneSubMenuBySubMenuId/:_id')
    async findOneSubMenuBySubMenuId(@Param('_id') _id: string) {
        return await this.subMenuService.findOneSubMenuBySubMenuId(_id);
    }
    // @Get()
    // findAll() {
    //   return this.subMenuService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.subMenuService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateSubMenuDto: UpdateSubMenuDto) {
    //   return this.subMenuService.update(+id, updateSubMenuDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.subMenuService.remove(+id);
    // }
}



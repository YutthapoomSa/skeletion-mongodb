import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubMenuService } from './sub-menu.service';
import { CreateSubMenuReqDTO } from './dto/create-sub-menu.dto';
import { UpdateSubMenuDto } from './dto/update-sub-menu.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('submenu')
@Controller('sub-menu')
export class SubMenuController {
    constructor(private readonly subMenuService: SubMenuService) {}

    @Post('createSubMenu')
    async create(@Body() body: CreateSubMenuReqDTO) {
        return this.subMenuService.create(body);
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



import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleReqDTO } from './dto/create-role.dto';
import { UpdateRoleReqDTO } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post('createRole')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: CreateRoleReqDTO })
    async create(@Body() createRoleDto: CreateRoleReqDTO) {
        return await this.roleService.createRole(createRoleDto);
    }

    @Get('findAllRoles')
    async findAll() {
        return await this.roleService.findAllRole();
    }

    @Get('findOne/:_id')
    async findOne(@Param('_id') _id: string) {
        return await this.roleService.findOneRole(_id);
    }

    @Patch('updateRole/:_id')
    async update(@Param('_id') _id: string, @Body() body: UpdateRoleReqDTO) {
        return await this.roleService.updateRole(_id, body);
    }

    @Delete('deleteRole/:_id')
    async remove(@Param('_id') _id: string) {
        return await this.roleService.deleteRole(_id);
    }
}

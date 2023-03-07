import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto, CreateGroupResDTO } from './dto/create-group.dto';
import { UpdateGroupReqDTO } from './dto/update-group.dto';
import { GroupRepository } from './group.repository';

@ApiTags('Group')
@Controller('group')
export class GroupController {
    constructor(private readonly groupRepository: GroupRepository) {}

    @Post('createGroup')
    @ApiOperation({ summary: 'สร้างข้อมูลรายการกลุ่มผู้ใช้งาน' })
    @ApiOkResponse({ type: CreateGroupResDTO })
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupRepository.createGroup(createGroupDto);
    }

    @Get('findOneGroup/:_id')
    async findOne(@Param('_id') _id: string) {
        return await this.groupRepository.findOne(_id);
    }

    @Get('findAllGroup')
    async findAll() {
        return await this.groupRepository.findAll();
    }

    @Patch('updateGroup/:_id')
    async updateGroup(@Param('_id') _id: string, @Body() body: UpdateGroupReqDTO) {
        return await this.groupRepository.updateGroup(_id, body);
    }

    @Delete('deleteRole/:_id')
    async deleteGroup(@Param('_id') _id: string) {
        return await this.groupRepository.deleteGroup(_id);
    }
}

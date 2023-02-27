import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto, CreateGroupResDTO } from './dto/create-group.dto';
import { GroupRepository } from './group.repository';

@ApiTags('Group')
@Controller('group')
export class GroupController {
    constructor(private readonly groupRepository: GroupRepository) {}

    @Post('CreateGroup')
    @ApiOperation({ summary: 'สร้างข้อมูลรายการกลุ่มผู้ใช้งาน' })
    @ApiOkResponse({ type: CreateGroupResDTO })
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupRepository.createGroup(createGroupDto);
    }
}

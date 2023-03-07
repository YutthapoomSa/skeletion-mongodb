import { HttpException, HttpStatus, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../user/user.repository';
import { GroupDB } from './../../entities/group.entity';
import { LogService } from './../../services/log.service';
import { CreateGroupDto, CreateGroupResDTO } from './dto/create-group.dto';
import { ResStatus } from 'src/share/enum/res-status.enum';
import { FindOneResDTO } from './dto/findOne-group.dto';
import { FindAllGroupDTO } from './dto/findAll-group.dto';
import { UpdateRoleResDTO } from './../role/dto/update-role.dto';
import { UpdateGroupReqDTO } from './dto/update-group.dto';
import { GlobalResDTO } from '../global-dto/global-res.dto';

export class GroupRepository implements OnApplicationBootstrap {
    private logger = new LogService(UserRepository.name);

    constructor(@InjectModel(GroupDB.name) private readonly groupModel: Model<GroupDB>) {}
    async onApplicationBootstrap() {
        //
    }

    async createGroup(body: CreateGroupDto) {
        const tag = this.createGroup.name;
        try {
            const _group = new this.groupModel(
                {
                    groupName: body.groupName,
                },
                '-__v',
            );
            await _group.save();
            if (_group) {
                return new CreateGroupResDTO(ResStatus.success, 'สร้างกลุ่มผู้ใช้งานสำเร็จ 😛', _group);
            } else {
                throw new Error('create group fail');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOne(_id: string) {
        const tag = this.findOne.name;
        try {
            if (!_id) throw new Error('_id is required 🤬');

            const result = await this.groupModel.findById(_id);
            if (result) {
                return new FindOneResDTO(ResStatus.success, 'Success', result);
            } else {
                throw new Error('Failed to Find group with ID ${_id}');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        const tag = this.findAll.name;
        try {
            const result = await this.groupModel.find();
            if (result) {
                return new FindAllGroupDTO(ResStatus.success, '', result);
            } else {
                throw new Error('Failed to Find group');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateGroup(_id: string, body: UpdateGroupReqDTO) {
        const tag = this.updateGroup.name;
        try {
            if (!_id) throw new Error('_id is required 🤬');

            const result = await this.groupModel.updateOne(
                {
                    id: _id,
                },
                {
                    $set: {
                        groupName: body.groupName,
                    },
                },
            );
            if (result) {
                return result;
            } else {
                throw new Error('Failed to Update group');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteGroup(_id: string) {
        const tag = this.deleteGroup.name;
        try {
            const result = await this.groupModel.deleteOne({
                id: _id,
            });
            if (!result) throw new Error('data not found');
            if (result) {
                return new GlobalResDTO(ResStatus.success, 'สำเร็จ');
            } else {
                throw new Error('Failed to delete group with ID ${_id}');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

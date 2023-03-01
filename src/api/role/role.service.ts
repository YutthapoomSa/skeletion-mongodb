import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { Model } from 'mongoose';
import { RoleDB } from 'src/entities/role.entity';
import { LogService } from 'src/services/log.service';
import { ResStatus } from 'src/share/enum/res-status.enum';
import { GlobalResDTO } from '../global-dto/global-res.dto';
import { CreateRoleReqDTO, CreateRoleResDTO } from './dto/create-role.dto';
import { FindAllRoleResDTO } from './dto/findAll.-role.dto';
import { FindOneRoleResDTO } from './dto/findOne-role.dto';
import { UpdateRoleReqDTO } from './dto/update-role.dto';
var mongoose = require('mongoose');

@Injectable()
export class RoleService implements OnApplicationBootstrap {
    private logger = new LogService(RoleService.name);

    constructor(@InjectModel(RoleDB.name) private readonly roleModel: Model<RoleDB>) {}
    onApplicationBootstrap() {
        //
    }
    // ─────────────────────────────────────────────────────────────

    async createRole(body: CreateRoleReqDTO) {
        const tag = this.createRole.name;
        try {
            if (!body) throw new Error('data is required 🤬');

            const groupIds = body.groupList.map((id) => mongoose.Types.ObjectId(id));

            const result = new this.roleModel({
                roleName: body.roleName,
                groupList: groupIds,
            });

            const savedResult = await result.save();
            return new CreateRoleResDTO(ResStatus.success, 'สร้างสิทธิ์การใช้งานสำเร็จ', savedResult);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneRole(_id: string) {
        const tag = this.findOneRole.name;
        try {
            if (!_id) throw new Error('_id is required 🤬');

            const result = await this.roleModel.findById(_id);
            return new FindOneRoleResDTO(ResStatus.success, 'ค้นหาสำเร็จ', result);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllRole() {
        const tag = this.findAllRole.name;
        try {
            const result = await this.roleModel.find();
            if (result) {
                return new FindAllRoleResDTO(ResStatus.success, '', result);
            } else {
                throw new error('data is empty');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRole(_id: string, body: UpdateRoleReqDTO) {
        const tag = this.updateRole.name;
        try {
            const result = await this.roleModel.updateOne(
                {
                    id: _id,
                },
                {
                    $set: {
                        roleName: body.roleName,
                    },
                },
            );
            if (result) {
                return result;
            } else {
                throw new error('Failed to update role with ID ${_id}');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRole(_id: string) {
        const tag = this.deleteRole.name;
        try {
            if (!_id) throw new Error('_id is required 🤬');

            const result = await this.roleModel.deleteOne({ _id });
            if (!result) throw new Error('data not found');
            if (result) {
                return new GlobalResDTO(ResStatus.success, 'สำเร็จ');
            } else {
                throw new Error('Failed to delete role with ID ${_id}');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

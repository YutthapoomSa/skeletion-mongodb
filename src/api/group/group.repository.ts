import { HttpException, HttpStatus, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../user/user.repository';
import { GroupDB } from './../../entities/group.entity';
import { LogService } from './../../services/log.service';
import { CreateGroupDto } from './dto/create-group.dto';

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
                    name: body.name,
                },
                '-__v',
            );
            await _group.save();
            return _group;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

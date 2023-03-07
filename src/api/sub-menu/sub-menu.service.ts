import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResStatus } from 'src/share/enum/res-status.enum';
import { SubMenuDB } from './../../entities/sub-menu.entity';
import { LogService } from './../../services/log.service';
import { CreateSubMenuReqDTO, CreateSubmenuResDTO } from './dto/create-sub-menu.dto';

@Injectable()
export class SubMenuService implements OnApplicationBootstrap {
    private logger = new LogService(SubMenuService.name);

    constructor(@InjectModel(SubMenuDB.name) private readonly subMenuModel: Model<SubMenuDB>) {}
    onApplicationBootstrap() {
        //
    }
    // ─────────────────────────────────────────────────────────────
    async create(body: CreateSubMenuReqDTO) {
        const tag = this.create.name;
        try {
            if (!body) throw new Error('data is required 🤬');

            const _subMenu = new this.subMenuModel(
                {
                    nameSubmenu: body.nameSubmenu,
                    iframe: body.iframe,
                    ExternalLink: body.ExternalLink,
                    InternalLink: body.InternalLink,
                },
                '-__V',
            );
            await _subMenu.save();
            if (_subMenu) {
                return new CreateSubmenuResDTO(ResStatus.success, 'success', _subMenu);
            } else {
                throw new Error('create sub menu failed');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneSubMenuBySubMenuId(_id: string) {
        const tag = this.findOneSubMenuBySubMenuId.name;
        try {
            if (!_id) throw new Error('id is required 🤬');

            const subMenu = await this.subMenuModel.findById(_id);

            if (subMenu) {
                return subMenu;
            } else {
                throw new Error('No menu found');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // findAll() {
    //     return `This action returns all subMenu`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} subMenu`;
    // }

    // update(id: number, updateSubMenuDto: UpdateSubMenuDto) {
    //     return `This action updates a #${id} subMenu`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} subMenu`;
    // }
}

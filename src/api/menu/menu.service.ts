import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateMenuReqDTO, CreateMenuResDTO } from './dto/create-menu.dto';
import { PaginationService } from './../../services/pagination.service';
import { UserDB, UserDBRole } from './../../entities/user.entity';
import { MenuDB, SubMenuDB } from './../../entities/menu.entity';
import { ResStatus } from './../../share/enum/res-status.enum';
import { ConfigService } from './../../config/config.service';
import { LogService } from './../../services/log.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateMenuReqDTO, UpdateMenuResDTO, UpdateMenuResDTOData } from './dto/update-menu.dto';

@Injectable()
export class MenuService implements OnApplicationBootstrap {
    private logger = new LogService(MenuService.name);

    constructor(
        @InjectModel(MenuDB.name)
        private readonly menuModel: Model<MenuDB>,
        @InjectModel(SubMenuDB.name)
        private readonly subMenuModel: Model<SubMenuDB>,
        private configService: ConfigService,
        private paginationService: PaginationService,
    ) {}
    onApplicationBootstrap() {
        // throw new Error('Method not implemented.');
    }

    // ──────────────────CreateMenu 👇🏻─────────────────────────────

    async createMenu(user: UserDB, body: CreateMenuReqDTO) {
        const tag = this.createMenu.name;
        try {
            if (String(user.role) === String(UserDBRole.Admin)) throw new Error('😡 Not authorized');
            if (!body) throw new Error('Body is required');

            const _create = new this.menuModel();
            _create.name = body.name;
            _create.subMenuList = [];

            for (const iterator of body.subMenuList) {
                const _submenu = new this.subMenuModel();
                _submenu.nameSubmenu = iterator.nameSubmenu;
                _submenu.iframe = iterator.iframe;
                _submenu.ExternalLink = iterator.ExternalLink;
                _submenu.InternalLink = iterator.InternalLink;
                _create.subMenuList.push(_submenu);
            }
            console.log('_createMenu -> ', JSON.stringify(_create));
            await _create.save();
            return new CreateMenuResDTO(ResStatus.success, '🌶️ สร้างเมนูสำเร็จ 🌶️', _create);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ───────────────────────────UpdateMenu 👇🏻──────────────────────────────────────

    async updateMenu(body: UpdateMenuReqDTO, user: UserDB, _id: string) {
        const tag = this.updateMenu.name;
        try {
            if (String(user.role) === String(UserDBRole.Admin)) throw new Error('😡 Not authorized');
            // if (!_id) throw new Error('id is required 😡');
            if (!body) throw new Error('data not found 🕵🏻');

            const subMenusToUpdate: SubMenuDB[] = [];
            for (const iterator of body.subMenuList) {
                const _submenu = new this.subMenuModel();
                _submenu.nameSubmenu = iterator.nameSubmenu;
                _submenu.iframe = iterator.iframe;
                _submenu.ExternalLink = iterator.ExternalLink;
                _submenu.InternalLink = iterator.InternalLink;
                subMenusToUpdate.push(_submenu);
            }
            const updatedMenu = await this.menuModel.findByIdAndUpdate(_id, {
                $set: {
                    name: body.name,
                    subMenuList: subMenusToUpdate,
                },
            });
            if (!updatedMenu) {
                throw new Error('Could not find menu to update');
            }

            return new UpdateMenuResDTO(ResStatus.success, 'Success', updatedMenu);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

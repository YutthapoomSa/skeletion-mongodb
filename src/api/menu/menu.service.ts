import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ConfigService } from './../../config/config.service';
import { MenuDB } from './../../entities/menu.entity';
import { UserDB, UserDBRole } from './../../entities/user.entity';
import { LogService } from './../../services/log.service';
import { PaginationService } from './../../services/pagination.service';
import { ResStatus } from './../../share/enum/res-status.enum';
import { CreateMenuReqDTO, CreateMenuResDTO } from './dto/create-menu.dto';
import { findOneMenuDTO } from './dto/findOne-menu.dto';
import { UpdateMenuReqDTO, UpdateMenuResDTO } from './dto/update-menu.dto';

@Injectable()
export class MenuService implements OnApplicationBootstrap {
    private logger = new LogService(MenuService.name);

    constructor(
        @InjectModel(MenuDB.name)
        private readonly menuModel: Model<MenuDB>,
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
            // if (String(user.role) === String(UserDBRole.Admin)) throw new Error('😡 Not authorized');
            // if (!body) throw new Error('Body is required');
            const _create = new this.menuModel({
                name: body.name,
                subMenuList: body.subMenuList, // Assuming subMenuList is an array of object IDs
            });

            // console.log('_createMenu -> ', JSON.stringify(_create));
            await _create.save();
            return new CreateMenuResDTO(ResStatus.success, '🌶️ สร้างเมนูสำเร็จ 🌶️', _create);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ───────────────────────────UpdateMenu 👇🏻──────────────────────────────────────

    async updateMenu(body: UpdateMenuReqDTO, _id: string) {
        const tag = this.updateMenu.name;
        try {
            if (!body) throw new Error('data not found 🕵🏻');
            const menu = await this.menuModel.findById(_id);
            const subMenuList = body.subMenuList ? body.subMenuList.map((id) => new mongoose.Types.ObjectId(id)) : menu.subMenuList;

            const updateMenu = await this.menuModel.findById(
                {
                    id: _id,
                },
                {
                    $set: {
                        subMenuList,
                    },
                },
            );

            if (!updateMenu) {
                throw new Error('Could not find menu to update');
            }
            return new UpdateMenuResDTO(ResStatus.success, 'Success', updateMenu);
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAllMenu() {
        const tag = this.findAllMenu.name;
        try {
            const menus = await this.menuModel
                .find()
                .select('_id name')
                .populate({
                    path: 'subMenuList',
                    populate: [
                        {
                            path: 'nameSubmenu',
                        },
                    ],
                });

            if (menus) {
                return menus;
            } else {
                throw new Error('No menu found');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneMenu(_id: string) {
        const tag = this.findAllMenu.name;
        try {
            if (!_id) throw new Error('id is required 🤬');

            const menu = await this.menuModel.findById(_id);

            if (menu) {
                return new findOneMenuDTO(ResStatus.success, 'Success', menu);
            } else {
                throw new Error('No menu found');
            }
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getMenuById(_id: string) {
        const tag = this.getMenuById.name;
        try {
            const result = await this.menuModel.findById({ _id: _id }).populate({
                path: 'subMenuList',
                populate: [
                    {
                        path: 'nameSubmenu iframe ExternalLink InternalLink',
                    },
                ],
            });
            return result;
        } catch (error) {
            console.error(`${tag} -> `, error);
            this.logger.error(`${tag} -> `, error);
            throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

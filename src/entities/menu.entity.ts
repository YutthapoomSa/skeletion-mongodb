import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'subMenu',
    _id: false,
})
export class SubMenuDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    nameSubmenu: string;

    @Prop({
        type: MongooseSchema.Types.String,
        allowNull: true,
    })
    iframe: string;

    @Prop({
        type: MongooseSchema.Types.String,
        allowNull: true,
    })
    ExternalLink: string;

    @Prop({
        type: MongooseSchema.Types.String,
        allowNull: true,
    })
    InternalLink: string;
}
export const SubMenuSchema = SchemaFactory.createForClass(SubMenuDB);

// ─────────────────────────────────────────────────────────────────────────────

@Schema({
    collection: 'menu',
    _id: true,
})
export class MenuDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    name: string;

    @Prop({
        type: [SubMenuSchema],
        required: true,
    })
    subMenuList: SubMenuDB[];
}
export const MenuSchema = SchemaFactory.createForClass(MenuDB);

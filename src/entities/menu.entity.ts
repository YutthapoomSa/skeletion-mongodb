import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { SubMenuDB } from 'src/entities/sub-menu.entity';

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
        type: [{ type: MongooseSchema.Types.ObjectId, ref: SubMenuDB.name }],
        required: false,
    })
    subMenuList: MongooseSchema.Types.ObjectId[];
}
export const MenuSchema = SchemaFactory.createForClass(MenuDB);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

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
}
export const MenuSchema = SchemaFactory.createForClass(MenuDB);

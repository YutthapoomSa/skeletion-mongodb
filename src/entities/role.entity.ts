import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'roleUser',
    _id: true,
})
export class RoleDB extends Document{
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    roleName: string;
}
export const RoleSchema = SchemaFactory.createForClass(RoleDB);

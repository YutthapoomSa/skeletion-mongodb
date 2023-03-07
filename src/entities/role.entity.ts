import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { GroupSchema, GroupDB } from './group.entity';

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

    @Prop({ type: [GroupSchema] })
    groupList: GroupDB[];

    @Prop({ default: Date.now })
    createdAt: Date;
}
export const RoleSchema = SchemaFactory.createForClass(RoleDB);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
    collection: 'group',
    _id: true,
})
export class GroupDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    groupName: string;
   
    @Prop({ default: Date.now })
    createdAt: Date;
}

export const GroupSchema = SchemaFactory.createForClass(GroupDB);
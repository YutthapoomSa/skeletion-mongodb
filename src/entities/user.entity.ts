import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { GroupDB } from './group.entity';

export enum UserDBRole {
    User = 'User',
    Admin = 'Admin',
    SuperAdmin = 'SuperAdmin',
    Manager = 'Manager',
}

export enum UserDBGender {
    MALE = 'ผู้ชาย',
    FEMALE = 'ผู้หญิง',
    OTHER = 'อื่นๆ',
}

export enum UserDBPrefix {
    Mr = 'นาย',
    Mrs = 'นาง',
    Miss = 'นางสาว',
}
@Schema({
    collection: 'user',
    _id: true,
})
export class UserDB extends Document {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    email: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    username: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
    })
    password: string;

    @Prop({
        enum: Object.keys(UserDBPrefix).map((k) => UserDBPrefix[k]),
        required: true,
    })
    prefix: UserDBPrefix;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    firstName: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
    })
    lastName: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
    })
    phoneNumber: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: false,
        default: 'avatar.png',
    })
    imageUser: string;

    @Prop({
        enum: Object.keys(UserDBGender).map((k) => UserDBGender[k]),
        required: true,
    })
    gender: UserDBGender;

    // @Prop({
    //     type: [UserRoleSchema],
    // })
    // role: UserRoleDB[];

    @Prop({
        enum: Object.keys(UserDBRole).map((k) => UserDBRole[k]),
        default: UserDBRole.User,
    })
    role: UserDBRole;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDB);

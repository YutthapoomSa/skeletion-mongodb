import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDBGender, UserDBPrefix, UserDBRole } from './../../../entities/user.entity';

export class GroupUserRole {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    position: string;
}

export class UserRoleData {
    @ApiProperty({
        enum: Object.keys(UserDBRole).map((k) => UserDBRole[k]),
    })
    @IsNotEmpty()
    @IsString()
    role: UserDBRole;

    @ApiProperty()
    @IsNotEmpty()
    group: string;
}

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        enum: Object.keys(UserDBPrefix).map((k) => UserDBPrefix[k]),
    })
    @IsNotEmpty()
    @IsString()
    prefix: UserDBPrefix;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({
        enum: Object.keys(UserDBGender).map((k) => UserDBGender[k]),
    })
    @IsNotEmpty()
    @IsString()
    gender: UserDBGender;

    // @ApiProperty({
    //     type: [UserRoleData],
    // })
    // @IsNotEmpty()
    // @IsArray()
    // roleList: UserRoleData[];
}

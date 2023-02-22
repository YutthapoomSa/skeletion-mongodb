import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    name: string;
}

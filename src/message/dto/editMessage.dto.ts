import { IsNotEmpty, IsString } from 'class-validator';

export class EditMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}

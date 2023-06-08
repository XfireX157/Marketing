import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  @ApiProperty()
  name: string;
}

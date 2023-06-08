import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class todoDto {
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Essa campo não pode está vazio' })
  @ApiProperty()
  price: number;

  @IsNotEmpty({ message: 'categoryName não pode ser vazio' })
  @ApiProperty()
  categoryName: string;
}

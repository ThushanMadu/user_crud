import { IsString, IsNumber, IsOptional, IsArray, MinLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Create Product DTO
 * Data transfer object for creating a new product
 */
export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'iPhone 15 Pro',
    minLength: 2,
  })
  @IsString()
  @MinLength(2, { message: 'Product name must be at least 2 characters long' })
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Latest iPhone with advanced camera system',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Product price',
    example: 999.99,
    minimum: 0,
  })
  @IsNumber({}, { message: 'Price must be a valid number' })
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @ApiProperty({
    description: 'Product images URLs',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}


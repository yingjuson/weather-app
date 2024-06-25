import { IsNotEmpty, IsString } from 'class-validator';

export class AddressParams {
  @IsString()
  @IsNotEmpty()
  address: string;
}

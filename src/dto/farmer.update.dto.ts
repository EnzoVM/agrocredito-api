import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export default class FarmerUpdateDTO {

  @IsNotEmpty({ message: 'Farmer type is empty'})
  @IsString({ message: 'Farmer type must be a string'})
    farmerId: string

  @IsOptional({ message: 'Farmer address is empty'})
  @IsString({ message: 'Farmer addresss must be a string'})
    farmerAddress?: string

  @IsOptional({ message: 'Farmer project id is empty'})
  @IsNumber({}, { message: 'Farmer project id must be a number'})
    farmerProjectId?: number

  @IsOptional({ message: 'Property hercate quantity is empty'})
  @IsNumber({}, { message: 'Property hercate quantityl must be a number'})
    hectareQuantity?: number

  constructor({ 
    farmerId,
    farmerAddress,
    farmerProjectId,
    hectareQuantity
  }:{
    farmerId: string,
    farmerAddress?: string,
    farmerProjectId?: number,
    hectareQuantity?: number
  }) {
    this.farmerId = farmerId   
    this.farmerAddress = farmerAddress
    this.farmerProjectId = farmerProjectId
    this.hectareQuantity = hectareQuantity
  }
}
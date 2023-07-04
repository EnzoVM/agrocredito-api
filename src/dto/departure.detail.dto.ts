import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export default class DepartureDetailDTO {

    @IsNotEmpty({ message: 'Delivery plan model ID is empty'})
    @IsNumber({}, { message: 'Delivery plan model ID must be a number'})
      deliveryPlanModelId: number

    @IsNotEmpty({ message: 'Description of departure detail is empty'})
    @IsString({ message: 'Description of departure detail must be a string'})
      departureDetailDescription: string

    @IsNotEmpty({ message: 'Departure type is empty'})
    @IsString({ message: 'Departure type must be a string'})
      departureType: string

    @IsNotEmpty({ message: 'Amount per hectare is empty'})
    @IsNumber({}, { message: 'Amount per hectare must be a number'})
      amountPerHectare: number

    constructor({ 
      deliveryPlanModelId,
      departureDetailDescription,
      departureType,
      amountPerHectare
    }:{
      deliveryPlanModelId: number,
      departureDetailDescription: string,
      departureType: string,
      amountPerHectare: number
    }) {
      this.deliveryPlanModelId = deliveryPlanModelId
      this.departureDetailDescription = departureDetailDescription
      this.departureType = departureType
      this.amountPerHectare = amountPerHectare
    }
}
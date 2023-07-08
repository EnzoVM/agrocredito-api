import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export default class FarmerCreateDTO {

  @IsNotEmpty({ message: 'Property sector id is empty'})
  @IsNumber({}, { message: 'Property sector id must be a number'})
    propertySectorId: number

  @IsNotEmpty({ message: 'Property project id is empty'})
  @IsNumber({}, { message: 'Property project id must be a number'})
    propertyProjectCode: number

  @IsNotEmpty({ message: 'Farmer quality is empty'})
  @IsNumber({}, { message: 'Farmer quality is must be a number'})
    farmerQualityId: number

  @IsNotEmpty({ message: 'Farmer type is empty'})
  @IsString({ message: 'Farmer type must be a string'})
    farmerType: string
  
  @IsOptional()
  @IsString({ message: 'Social reason must be a string'})
    socialReason?: string

  @IsOptional()
  @IsString({ message: 'Full names must be a string'})
    fullNames?: string

  @IsOptional()
  @IsString({ message: 'DNI must be a string'})
    dni?: string

  @IsOptional()
  @IsString({ message: 'RUC must be a string'})
    ruc?: string

  @IsNotEmpty({ message: 'Property location is empty'})
  @IsString({ message: 'Property location must be a strign'})
    propertyLocation: string

  @IsNotEmpty({ message: 'Property legal condition id is empty'})
  @IsNumber({}, { message: 'Property legal condition id must be a number'})
    propertyLegalConditionId: number

  @IsNotEmpty({ message: 'Cadastral registry is empty'})
  @IsString({ message: 'Cadastral registry must be a string'})
    cadastralRegistry: string

  @IsNotEmpty({ message: 'Farmer address is empty'})
  @IsString({ message: 'Farmer addresss must be a string'})
    farmerAddress: string

  @IsNotEmpty({ message: 'Farmer project id is empty'})
  @IsNumber({}, { message: 'Farmer project id must be a number'})
    farmerProjectId: number

  @IsNotEmpty({ message: 'Property hercate quantity is empty'})
  @IsNumber({}, { message: 'Property hercate quantityl must be a number'})
    propertyHectareQuantity: number

  constructor({ 
    propertySectorId,   
    propertyProjectCode,
    farmerQualityId,
    farmerType,
    socialReason,
    fullNames,
    dni,
    ruc,
    propertyLocation,
    propertyLegalConditionId,
    cadastralRegistry,
    farmerAddress,
    farmerProjectId,
    propertyHectareQuantity
  }:{
    propertySectorId: number   
    propertyProjectCode: number
    farmerQualityId: number
    farmerType: string
    socialReason?: string
    fullNames?: string
    dni?: string
    ruc?: string
    propertyLocation: string
    propertyLegalConditionId: number
    cadastralRegistry: string
    farmerAddress: string
    farmerProjectId: number
    propertyHectareQuantity: number
  }) {
    this.propertySectorId = propertySectorId   
    this.propertyProjectCode = propertyProjectCode
    this.farmerQualityId = farmerQualityId
    this.farmerType = farmerType
    this.socialReason = socialReason
    this.fullNames = fullNames
    this.dni = dni
    this.ruc = ruc
    this.propertyLocation = propertyLocation
    this.propertyLegalConditionId = propertyLegalConditionId
    this.cadastralRegistry = cadastralRegistry
    this.farmerAddress = farmerAddress
    this.farmerProjectId = farmerProjectId
    this.propertyHectareQuantity = propertyHectareQuantity
  }
}
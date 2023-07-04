export default interface FarmerAttributes {
  farmerQualities: { farmerQualityId: number, farmerQualityDescription: string }[]
  propertyLegalConditions: { propertyLegalConditionId: number, propertyLegalConditionDescription: string }[]
}
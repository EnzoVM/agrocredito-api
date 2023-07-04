
export default class DepartureDetail {
  departureDetailId: number
  deliveryPlanModelId: number
  departureDetailDescription: string
  departureType: string
  resource: string
  amountPerHectare: number

  constructor({
    departureDetailId, 
    deliveryPlanModelId, 
    departureDetailDescription, 
    departureType,
    resource,
    amountPerHectare
  }: {
    departureDetailId: number
    deliveryPlanModelId: number
    departureDetailDescription: string
    departureType: string
    resource: string
    amountPerHectare: number
  }) {
    this.departureDetailId = departureDetailId
    this.deliveryPlanModelId = deliveryPlanModelId
    this.departureDetailDescription = departureDetailDescription
    this.departureType = departureType
    this.resource = resource
    this.amountPerHectare = amountPerHectare
  }
}
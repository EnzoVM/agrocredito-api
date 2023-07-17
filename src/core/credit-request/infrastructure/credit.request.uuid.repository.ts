import CreditRequestIdGeneratorRepository from "../domain/credit.request.id.generator.repository";
import { v4 as uuid } from 'uuid'

export default class CreditRequestUuidRepository implements CreditRequestIdGeneratorRepository {
  
  generateCreditRequestId (): string {
    return uuid()
  }
}
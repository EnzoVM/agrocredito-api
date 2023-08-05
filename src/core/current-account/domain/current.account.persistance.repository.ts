import CurrentAccountList from "./current.account.list.model";

export default interface CurrentAccountPersistanceRepository {
  listCurrentAcount: () => Promise<CurrentAccountList[]>
}
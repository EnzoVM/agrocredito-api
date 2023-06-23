import User from "./user.model";

export default interface UserRespository {
  findUserByEmail(email: string): Promise<User | null>
}
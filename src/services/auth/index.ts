import AuthRepository from "../../repository/auth";
import { comparePasswords, hashPasswordUsingBcrypt } from "../../utils/bcrypt";

class AuthServiceClass {
  async findByEmail(email: string) {
    return await AuthRepository.findByEmail(email);
  }

  async samePassword(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }

  async createUserInAuth(email: string, password: string, user: any) {
    return await AuthRepository.createUser(email, password, user._id);
  }
  async findById(userId: string) {
    return await AuthRepository.findById(userId);
  }
  async hashPassword(password: string) {
    return await hashPasswordUsingBcrypt(password);
  }

  async comparePassword(password: string, hashedPasswordFromDB: string) {
    return await comparePasswords(password, hashedPasswordFromDB);
  }
  async save(entity: any) {
    return await AuthRepository.save(entity);
  }

  async isEmailVerified(userId: string) {
    return await AuthRepository.isEmailVerified(userId);
  }
  async userDisabled(email: string) {
    return await AuthRepository.userDisabled(email);
  }
}

const AuthService = new AuthServiceClass();

export default AuthService;

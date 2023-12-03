import { AuthModel } from "../../models/auth";

class AuthRepositoryClass {
  async findByEmail(email: string) {
    return await AuthModel.findOne({ email });
  }

  async createUser(email: string, password: string, user: any) {
    return await AuthModel.create({
      email,
      password,
      user,
    });
  }

  async findById(userId: string) {
    return await AuthModel.findById(userId);
  }
  async save(entity: any) {
    return entity.save();
  }

  async isEmailVerified(userId: string) {
    const user = await AuthModel.findById({ _id: userId });
    return user?.isVerified;
  }

  async userDisabled(email: string) {
    const user = await this.findByEmail(email);
    return user?.disabled;
  }
}

const AuthRepository = new AuthRepositoryClass();

export default AuthRepository;

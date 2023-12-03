import dotEnv from "dotenv";
import UserRepository from "../../repository/user";
dotEnv.config();
const bucketName = process.env.S3_BUCKET_NAME;

class USerServiceClass {
  async findByEmail(email: string) {
    return await UserRepository.findByEmail(email);
  }

  async createUserInUser(name: string, email: string) {
    return await UserRepository.createUser(name, email);
  }

  async getAllUser() {
    return await UserRepository.getAllUser();
  }

  async updateProfilePicture(entity: any) {
    return await UserRepository.save(entity);
  }
  async findById(userId: string) {
    const res = await UserRepository.findById(userId);
    if (res) {
      return { success: true, data: res };
    }
    return { success: false, data: null };
  }

  async updateUser(email: string, entity: any) {
    const result = await UserRepository.updateUser(email, entity);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async getAllStudents() {
    const result = await UserRepository.getAllUser();
    if (result.length <= 0) {
      return { success: false, data: null };
    }
    const students = result.filter((ele: any) => {
      return ele.rank === 3;
    });

    return { success: true, data: students };
  }

  async addToMyLearning(courseId: string, userId: string) {
    const result = await UserRepository.addToMyLearning(courseId, userId);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async getMyLearning(userId: string) {
    const result = await UserRepository.getMyLearning(userId);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }
}

const UserService = new USerServiceClass();

export default UserService;

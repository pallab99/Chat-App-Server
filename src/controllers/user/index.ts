import dotEnv from "dotenv";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RESPONSE_MESSAGE } from "../../constant/responseMessage";
import { HTTP_STATUS } from "../../constant/statusCode";
import { publicURL } from "../../constant/user";
// import { generateFileName } from "../../helper/generateFileName";
import AuthService from "../../services/auth";
import UserService from "../../services/user";
import { databaseLogger } from "../../utils/dbLogger";
import { sendResponse } from "../../utils/response";
import { sendValidationError } from "../../utils/sendValidationError";
import mongoose from "mongoose";
import { UserModel } from "../../models/user";
const path = require("path");
const fs = require("fs");
dotEnv.config();
const bucketName = process.env.S3_BUCKET_NAME as string;

class UserControllerClass {
  async getAllUser(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { email } = req.user;
      const loggedInUser = await UserService.findByEmail(email);
      const { search } = req.query;

      const result = await UserService.getAllUser(
        search as string,
        loggedInUser?._id
      );
      if (result.length <= 0) {
        return sendResponse(res, HTTP_STATUS.OK, RESPONSE_MESSAGE.NO_DATA, []);
      }

      if (!result.length) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.SOMETHING_WENT_WRONG,
          []
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.SUCCESSFULLY_GET_ALL_DATA,
        result
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserProfile(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { user } = req;
      const userDetails = await UserService.findByEmail(user.email);
      if (!userDetails) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.SOMETHING_WENT_WRONG
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.SUCCESSFULLY_GET_ALL_DATA,
        userDetails
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  // async updateDp(req: Request, res: Response) {
  //   try {
  //     databaseLogger(req.originalUrl);
  //     const { email } = req.user;
  //     const file = req.file;
  //     if (!req.file) {
  //       return sendResponse(
  //         res,
  //         HTTP_STATUS.BAD_REQUEST,
  //         RESPONSE_MESSAGE.UPLOAD_FAILED
  //       );
  //     }

  //     console.log(req.file);

  //     const user = await UserService.findByEmail(email);
  //     if (!user) {
  //       return sendResponse(
  //         res,
  //         HTTP_STATUS.BAD_REQUEST,
  //         RESPONSE_MESSAGE.SOMETHING_WENT_WRONG
  //       );
  //     }
  //     const S3_Bucket_path = `user/dp`;
  //     const fileName = generateFileName(
  //       S3_Bucket_path,
  //       email,
  //       file.originalname
  //     );
  //     console.log(fileName, publicURL);

  //     const saveFileOnServer = await UserService.saveDpOnServer(
  //       file,
  //       fileName,
  //       user.email
  //     );
  //     if (saveFileOnServer.success) {
  //       user.dp = publicURL + fileName;
  //       await user.save();
  //     }

  //     if (user) {
  //       return sendResponse(
  //         res,
  //         HTTP_STATUS.ACCEPTED,
  //         RESPONSE_MESSAGE.DP_UPDATED,
  //         user
  //       );
  //     }

  //     return sendResponse(
  //       res,
  //       HTTP_STATUS.BAD_REQUEST,
  //       RESPONSE_MESSAGE.SOMETHING_WENT_WRONG
  //     );
  //   } catch (error: any) {
  //     console.log(error);
  //     databaseLogger(error.message);
  //     return sendResponse(
  //       res,
  //       HTTP_STATUS.INTERNAL_SERVER_ERROR,
  //       RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  async deleteUser(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const { userId } = req.params;
      const userInUser = await UserService.findById(userId);
      if (!userInUser.success && userInUser.data === null) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.SOMETHING_WENT_WRONG
        );
      }
      const data = userInUser?.data;
      if (data) {
        const { email } = data;
        const userInAuth = await AuthService.findByEmail(email);
        console.log({ userInAuth });
        if (!userInAuth) {
          return sendResponse(
            res,
            HTTP_STATUS.BAD_REQUEST,
            RESPONSE_MESSAGE.SOMETHING_WENT_WRONG
          );
        }
        userInAuth.disabled = true;
        const result = await AuthService.save(userInAuth);
        if (result) {
          return sendResponse(
            res,
            HTTP_STATUS.ACCEPTED,
            RESPONSE_MESSAGE.USER_DISABLED,
            userInAuth
          );
        }
      }
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        RESPONSE_MESSAGE.SOMETHING_WENT_WRONG
      );
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      databaseLogger(req.originalUrl);
      const validation = validationResult(req).array();
      if (validation.length) {
        return sendValidationError(res, validation);
      }
      // const { name, phoneNumber, notificationSetting } = req.body;
      const { email } = req.user;
      const updatedDoc = await UserService.updateUser(email, req.body);
      if (!updatedDoc.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.UPDATE_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.ACCEPTED,
        RESPONSE_MESSAGE.UPDATE_SUCCESS,
        updatedDoc.data
      );
      console.log(req.body);
    } catch (error: any) {
      console.log(error);
      databaseLogger(error.message);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const UserController = new UserControllerClass();

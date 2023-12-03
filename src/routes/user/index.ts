import express from "express";
import { upload } from "../../configs/file";
import { UserController } from "../../controllers/user";
import {
  isAdmin,
  isStudent,
  isStudentOrInstructor,
  tokenAuthorization,
} from "../../middlewares/tokenValidator";
import { validator } from "../../middlewares/validator";
const router = express.Router();

router
  .get("/all", [tokenAuthorization, isAdmin], UserController.getAllUser)
  .get("/me", [tokenAuthorization], UserController.getUserProfile)
  .delete(
    "/delete/:userId",
    [tokenAuthorization, isAdmin],
    UserController.deleteUser
  )
  .patch(
    "/update",
    [tokenAuthorization, isStudentOrInstructor, ...validator.updateUser],
    UserController.updateUser
  );

export default router;

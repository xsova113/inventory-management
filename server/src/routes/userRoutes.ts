import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/userControllers";

const router = Router();

router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;

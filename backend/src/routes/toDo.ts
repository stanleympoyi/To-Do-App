import express from "express";
import * as ToDoController from "../controller/toDo";
const router = express.Router();

router.get("/", ToDoController.getTodo);

router.post("/", ToDoController.createToDo);

export default router;

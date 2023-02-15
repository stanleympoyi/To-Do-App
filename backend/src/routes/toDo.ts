import express from "express";
import * as ToDoController from "../controller/toDo";
const router = express.Router();

router.get("/", ToDoController.getTodos);

router.get("/:toDoId", ToDoController.getTodo);

router.post("/", ToDoController.createToDo);

router.patch("/:toDoId", ToDoController.updateToDo);

router.delete("/:toDoId", ToDoController.deleteToDo);

export default router;

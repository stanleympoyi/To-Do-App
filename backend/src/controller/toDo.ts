import { RequestHandler } from "express";
import { title } from "process";
import ToDoModel from "../models/ToDo";

export const getTodo: RequestHandler = async (req, res, next) => {
  try {
    const ToDoList = await ToDoModel.find().exec();
    res.status(200).json(ToDoList);
  } catch (error) {
    next(error);
  }
};

export const createToDo: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const location = req.body.location;
  const duration = req.body.duration;

  try {
    const newToDo = await ToDoModel.create({
      title: title,
      text: text,
      location: location,
      duration: duration,
    });
    res.status(201).json({ newToDo });
  } catch (error) {
    next(Error);
  }
};

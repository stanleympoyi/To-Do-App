import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import ToDoModel from "../models/ToDo";

interface CreateToDoBody {
  title?: string;
  text?: string;
  location?: string;
  duration?: number;
}

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    const ToDoList = await ToDoModel.find().exec();
    res.status(200).json(ToDoList);
  } catch (error) {
    next(error);
  }
};

export const getTodo: RequestHandler = async (req, res, next) => {
  const toDoId = req.params.toDoId;
  try {
    if (!mongoose.isValidObjectId(toDoId)) {
      throw createHttpError(400, "Invalid to do Id");
    }
    const toDo = await ToDoModel.findById(toDoId).exec();
    res.status(200).json(toDo);
  } catch (error) {
    next(error);
  }
};

export const createToDo: RequestHandler<
  unknown,
  unknown,
  CreateToDoBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const location = req.body.location;
  const duration = req.body.duration;

  try {
    if (!title) {
      throw createHttpError(400, " To do assignment missing a title");
    }
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

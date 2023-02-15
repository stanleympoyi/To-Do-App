/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

interface UpdateToDoParams {
  toDoId: string;
}

interface UpdateToDoBody {
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

export const UpdateToDo: RequestHandler<
  UpdateToDoParams,
  unknown,
  UpdateToDoBody,
  unknown
> = async (req, res, next) => {
  const newTitle = req.body.title;
  const newText = req.body.text;
  const newLocation = req.body.location;
  const NewDuration = req.body.duration;

  const toDoId = req.params.toDoId;

  try {
    if (!mongoose.isValidObjectId(toDoId)) {
      throw createHttpError(400, "Not a valid to do ID");
    }
    if (!newTitle) {
      throw createHttpError(400, "missing a to do title");
    }
    const toDo = await ToDoModel.findById(toDoId).exec();

    if (!toDo) {
      throw createHttpError(404, "To do not found");
    }

    toDo!.title = newTitle;
    toDo!.text = newText;
    toDo!.location = newLocation;
    toDo!.duration = NewDuration;

    const updatedToDo = await toDo!.save();

    res.status(200).json(updatedToDo);
  } catch (error) {
    next(error);
  }
};

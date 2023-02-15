import { InferSchemaType, model, Schema } from "mongoose";

const toDoSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    location: { type: String },
    duration: { type: Number },
  },
  { timestamps: true }
);

type ToDo = InferSchemaType<typeof toDoSchema>;

export default model<ToDo>("ToDo", toDoSchema);

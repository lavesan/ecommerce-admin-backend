import mongoose, { Schema } from "mongoose";
import { HandleMode } from "./IAgent";

const agentSchema = new Schema({
  login: {
    type: String,
    index: true,
    unique: true,
  },
  name: String,
  password: String,
  domain: String,
  created_at: { type: Date, default: Date.now },
  medias: {
    voice: {
      min: Number,
      max: Number,
      selected: Number,
      handleMode: {
        type: String,
        enum: [HandleMode.AUTO, HandleMode.MANUAL],
        default: HandleMode.AUTO,
      },
    },
    email: {
      min: Number,
      max: Number,
      selected: Number,
    },
    chat: {
      min: Number,
      max: Number,
      selected: Number,
      handleMode: {
        type: String,
        enum: [HandleMode.AUTO, HandleMode.MANUAL],
        default: HandleMode.AUTO,
      },
    },
  },
});

const Agent = mongoose.model<IAgent>("Agent", agentSchema);

export { Agent };

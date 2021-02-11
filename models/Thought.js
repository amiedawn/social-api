const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a')
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    reactions: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Reaction'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

const Thought = model('Thought', ThoughtSchema);



module.exports = Thought;
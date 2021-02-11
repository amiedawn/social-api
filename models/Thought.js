const { Schema, model } = require('mongoose');
const moment = require('moment');
const ReactionSchema = require('./Reaction');

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
      get: (createdAtVal) => moment(createdAtVal).format('MMMM DD, YYYY, h:mm:ss a')
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    //associate reactions with thoughts
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

const Thought = model('Thought', ThoughtSchema);

// get total reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

module.exports = Thought;
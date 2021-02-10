const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address!']
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: "Thought",
      }
    ],
    friends: [
      {
      type: Schema.Types.ObjectId,
      ref: "User",
      }
    ],
  },  
  {
    //tell the schema that it can use virtuals
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// create the User model using the UserSchema
const User = model('User', UserSchema);

// get total count of comments and replies on retrieval
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.length;
});

// export the User model
module.exports = User;
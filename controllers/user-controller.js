const { User, Thought } = require('../models');

const userController = {
  //get all users: GET /api/users
  getAllUsers(req, res) {
    User.find({})
      .populate([
        {
          path: "thoughts",
          select: "-__v",
        },  
        {
          path: "friends",
          select: "-__v"
        }
        ])
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id: GET /api/users/:id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        {
          path: "thoughts",
          select: "-__v",
        },
        {
          path: "friends",
          select: "-__v",
        }
      ])
      .select("-__v")
      .then((dbUserData) => {
        // if no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a user: POST /api/users
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // update a user by id: PUT /api/users/:id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a user by id: DELETE /api/users/:id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // delete any friends from this user
        User.updateMany(
          { _id: { $in: dbUserData.friends } },
          { $pull: { friends: params.id } }
        )
        .then(() => {
          // delete any thoughts from this user
          Thought.deleteMany({ username: dbUserData.username })
          .then(() => {
            res.json({ message: "Successfully deleted user"});
          })
          .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  // add friend
  createFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // remove friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
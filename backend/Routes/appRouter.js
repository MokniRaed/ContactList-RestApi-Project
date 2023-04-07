const exprees = require("express");

const {
  getUsers,
  getUserById,
  deleteUser,
  addUser,
  register,
} = require("../Controller/userController");

const appRouter = exprees.Router();

// Add User object to the database
appRouter.post("/addUser", addUser);

// Get Array of Users objects from the database
appRouter.get("/getusers", getUsers);
// Get  Users object by ID from the database

appRouter.get("/getbyid/:id", getUserById);

appRouter.put("/edituser/:id");

appRouter.delete("/deleteuser/:id", deleteUser);
appRouter.post("/register",register)


module.exports = appRouter;

const exprees = require("express");

const {
  getUsers,
  getUserById,
  deleteUser,
  addUser,
  register,
  login,
} = require("../Controller/userController");
const { isAthentificated } = require("../MiddleWares/isAthentificated");

const appRouter = exprees.Router();
// Add User object to the database
appRouter.post("/addUser", addUser);
// Get Array of Users objects from the database
appRouter.get("/getusers",isAthentificated, getUsers);
// Get  Users object by ID from the database
appRouter.get("/getbyid/:id", getUserById);
appRouter.put("/edituser/:id");
appRouter.delete("/deleteuser/:id", deleteUser);
appRouter.post("/register",register)
appRouter.post('/login',login)

module.exports = appRouter;
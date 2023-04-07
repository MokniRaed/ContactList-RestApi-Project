const UserSchema = require("../Models/UserSchema");
const mongoose = require("mongoose");
const authSchema = require("../Models/authSchema");
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Somethig went wrong ⛔");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findById(id);

    //If cannot find user will return error message , esle will return the user object
    user
      ? res.status(200).send(user)
      : res.status(400).send("cannot find user ⚠️");

  } catch (error) {
    console.log(error);
    res.status(500).send("cannot get ");
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await new UserSchema(user);
    newUser.save();
    res.status(200).send("added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("something went Wrong ⛔");
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newuser = req.body;

    await UserSchema.findByIdAndUpdate(id, { $set: { ...newuser } });

    res.status(200).send("User has been edited ✅");
  } catch (error) {
    console.log(error);
    res.status(200).send("cannot edit ");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await UserSchema.findByIdAndRemove(id);
    res.status(200).send("User has been deleted ✅");
  } catch (error) {
    console.log(error);
    res.status(200).send("cannot delete user ");
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    //----- Checking if user already in the databse -------
    const dbResponse = await authSchema.findOne({ email });
    if (dbResponse) {
      return res.status(400).send("Email already exist !");
    }
    //-----------------------------------------------------

    //------ Password hashing ( coding ) ---------
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    //--------------------------------------------

    //----- Saving the new user o database-------
    const user = await new authSchema(req.body);
    user.password = hashPassword;
    user.save();
    //-------------------------------------------
    
    //---- Response if  the register works ------
    res.status(200).send("User Registred ✅");
    //-------------------------------------------
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected error");
  }
};

exports.login = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
    res.status(500).send("Unexpected error");
    }
}

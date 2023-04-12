import axios from "axios";

const token = localStorage.getItem("token");
//Define the request headers
const headers = {
  Authorization: `Bearer ${token}`,
};

export const editContactService = async (editedUser) => {
  const apiResponse = await axios.put(
    `http://localhost:3200/edituser/${editedUser._id}`,
    editedUser,
    {
      headers: headers,
    }
  );
  return apiResponse;
};

export const deleteContactService = async (id) => {
  const apiResponse = await axios.delete(
    `http://localhost:3200/deleteuser/${id}`,
    {
      headers: headers,
    }
  );
  return apiResponse;
};

export const addContactService = async (newContact) => {
  const apiResponse = await axios.post(
    "http://localhost:3200/addUser",
    newContact,
    {
      headers: headers,
    }
  );
  return apiResponse
};

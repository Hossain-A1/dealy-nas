const express = require("express");
const { signupUser, loginUser, getUser, deleteUser, updateUser, getUsers } = require("../controllers/user");
const authMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/admin.middleware");


// router
const router = express.Router()

// login user
router.post("/login",loginUser)
// signup user
router.post("/signup",signupUser)
// get all user
router.get("/all",authMiddleware,isAdmin,
getUsers)
// get an user
router.get("/:userId",authMiddleware,getUser)
// delete an user
router.delete("/:userId",authMiddleware,deleteUser)
// update an user
router.patch("/:userId", authMiddleware,updateUser)

module.exports = router
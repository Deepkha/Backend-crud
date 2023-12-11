const express=require("express");

const{ handleGetAllUsers, handleGetById,  handleUpdateById ,
    handleDeleteById,  handleDeleteAllUsers,
    handleCreateUsers } = require("../controllers/user")
const router=express.Router();

router.route("")
.get(handleGetAllUsers)
.post(handleCreateUsers)
.delete(handleDeleteAllUsers);

router.route("/:id")
    .get(handleGetById)
    .patch(handleUpdateById)
    .delete(handleDeleteById);

module.exports = router;

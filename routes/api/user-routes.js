// 18.1.7
const router = require('express').Router();

const { getAllUsers, createUser, getUserById, updatUser, deleteUser } = require('../../controllers/user-controller');
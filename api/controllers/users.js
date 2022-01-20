const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const User = require('../models/user');

router.get('/', verifyToken, async function index (req, res) {
    try{
        const users = await User.all
        res.status(200).json(users)
    }catch(err){
        res.status(500).send(err);
    }
})

router.get('/:id', async (req,res) =>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }catch(err){
        res.status(500).send(err);
    }    
})

module.exports = router

const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');

const Habit_Plan = require('../models/habit_plans');

router.get('/', verifyToken, async (req, res) => {
    try {

        // ginger add parameter req.user and req.query
        const habitPlan = await Habit_Plan.all( req.query.date, req.user)
        res.json(habitPlan)
    } catch (err) {
        res.status(500).send({ err })
    }
})

router.get('/:id', verifyToken, async (req, res) => {
    try {
    
        const habitPlan = await Habit_Plan.findById(req.params.id,req.query)


        res.json(habitPlan)
    } catch (err) {
        res.status(500).send({ err })
    }
})

router.post('/', verifyToken, async (req,res) => {
    try {
        const habitPlan = await Habit_Plan.create(req.body);
        res.status(201).json(habitPlan)
    } catch (err) {
        res.status(422).json({err})
    }
} )

router.patch('/:id', verifyToken, async (req,res) => {
    try {
        console.log('patch',ireq.body,req.params.id )
        const habitPlan = await Habit_Plan.update(req.body,req.params.id);
        res.status(201).json(habitPlan)
    } catch (err) {
        res.status(422).json({err})
    }
} )


module.exports = router
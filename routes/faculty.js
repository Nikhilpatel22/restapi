const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Faculty = require('../models/faculty');

router.get('/',(req,res,next)=>{
		Faculty.find()
		.then(result=>{
			res.status(200).json({
				facultyData:result
			});
		})
		.catch(err=>{
			res.status(500).json({
				error:err
			})
		})
})
router.post('/',(req,res,next)=>{
    const faculty=new Faculty({
	_id:new mongoose.Types.ObjectId,
	name:req.body.name,
	email:req.body.email,
	address:req.body.address,
	password:req.body.password
	})
		faculty.save()
		.then(result=>{
			console.log(result);
			res.status(200).json({
			newFaculty:result
			})
		})
		.catch(err=>{
			console.log(err);
			res.status(500).json({
				error:err
			})
		})
})
module.exports = router;

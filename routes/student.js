const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/student');


//getdata

router.get('/',(req,res,next)=>{
	Student.find()
	.then(result=>{
		res.status(200).json({
			studentData:result
		});
	})	
	.catch(err=>{
		cansole.log(err);
		res.status(500).json({
			error:err
		})
	}) 
});

//get data with id
router.get('/:id',(req,res,next)=>{
  			console.log(req.params.id);
  			Student.findById(req.params.id)
  			.then(result=>{
  				res.status(200).json({
  					student:result
  				})
  			})
  			.catch(err=>{
  				console.log(err);
  				res.status(500).json({
  					error:err
  				})
  			})
})

//post data insert the data in mongodb
router.post('/',(req,res,next)=>{
    const student=new Student({
	_id:new mongoose.Types.ObjectId,
	name:req.body.name,
	email:req.body.email,
	address:req.body.address,
	password:req.body.password
	})
		student.save()
		.then(result=>{
			console.log(result);
			res.status(200).json({
			newStudent:result
			})
		})
		.catch(err=>{
			console.log(err);
			res.status(500).json({
				error:err
			})
		})
})

//delete data in mongodb
router.delete('/:id',(req,res,next)=>{
	Student.deleteOne({_id:req.params.id})
	.then(result=>{
	res.status(200).json({
		message:'record delete',
		result:result
	})	
	})
	.catch(err=>{
	
		res.status(500).json({
			error:err
		})
	})
})

//put data in mongodb

router.put('/:id',(req,res,next)=>{
	Student.updateOne({_id:req.params.id},
	{
		$set:{
	name:req.body.name,
	email:req.body.email,
	address:req.body.address,
	password:req.body.password
		}
	})
	.then((result)=>{
		res.status(200).json({
			update_student:result
		})
	})
	.catch((err)=>{
		console.log(err);
		res.status(500).json({
			error:err
		})
	})
})

//search data in mongodb student collection
router.get('/search/:name',(req,res,next)=>
{
	var regex = new RegExp(req.params.name,'i');
	Student.find({name:regex})
	.then((result)=>{
		res.status(201).json(result)
	})
}) 
module.exports = router;

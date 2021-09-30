const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


// get the data with token

router.get('/',checkAuth,(req,res,next)=>{
	User.find()
	.exec()
	.then((result)=>{
		res.status(200).json({
			user_data:result
		})
	})
})
//get the data in mongodb user
//router.get('/',(req,res,next)=>{
//	User.find()
//	.then((result)=>{
//		res.status(200).json({
//			user_data:result
//		})
//	}).catch((err)=>{
//		res.status(500).json({
//			error:err
//		})
//	})
//})

router.get('/:id',(req,res,next)=>{
    User.findById(req.params.id)
    .then((result)=>{
    	res.status(200).json({
    		user_data:result
    	})
    }).catch((err)=>{
    	res.status(500).json({
    		error:err
    	})
    })
})
//post the data in mongodb user

router.post('/signup',(req,res,next)=>{
	bcrypt.hash(req.body.password,10,(err, hash)=>{
		if(err)
		{
			return res.status(500).json({
				error:err
			})
		}
		else
		{
			const user = new User({
				_id:new mongoose.Types.ObjectId,
				name:req.body.name,
				email:req.body.email,
				address:req.body.address,
				password:hash
			})
			user.save()
			.then((result)=>{
				res.status(200).json({
					userdata:result
				})
			})
			.catch((err)=>{
				res.status(500).json({
					error:err
				})
			})
		}
	})
})
//put the data in mongodb user

//delete the data in mongodb user

//search the data in mongodb user

//login user with token

router.post('/login',(req,res,next)=>{
       User.find({name:req.body.name})
       .exec()
       .then(user=>{
       	if(user.lengths < 1)
       	{
       		return res.status(401).json({
       			massege:'user not exit'
       		})
       	}
       	bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
       		if(!result)
       		{
       			return res.status(400).json({
       				massege:'password inccorect'
       			})
       		}
       		if(result)
       		{
       			const token = jwt.sign({
       				name:user[0].name,
       				email:user[0].email,
       				address:user[0].address
       			},
       			'this is dummy text',
       			{
       				expiresIn:"24h"
       			}
       			);
       			res.status(200).json({
       				name:user[0].name,
       				email:user[0].email,
       				address:user[0].address,
       				token:token
       			})
       		}
       	})

       })
       .catch(err=>{
       	res.status(500).json({
       		error:err
       	})
       })
})

module.exports = router;

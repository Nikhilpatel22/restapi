const express = require('express');
const app = express();
const studentRoute = require('./routes/student')
const facultyRoute = require('./routes/faculty')
const userRoute = require('./routes/user')

const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb+srv://Nikhil:Qd0alZpPFzcn9kVH@cluster0.3k4g8.mongodb.net/sample?retryWrites=true&w=majority',
	 {
		 useNewUrlParser: true,
		 useUnifiedTopology: true
	 }
)
mongoose.connection.on('error',err=>{
	console.log('conection failed');
});

mongoose.connection.on('connected',connected=>{
	console.log('conection successfull');
});

//.then(()=>{
//	console.warn("connected");
//})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);
app.use('/user',userRoute);


app.use((req,res,next)=>{
	res.status(404).json({
		error:'bad require'
	})
})

//app.use((req,res,next)=>{
//	res.status(200).json({
//		message:'app is runnning'
//	})
//})
module.exports = app;

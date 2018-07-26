const express=require('express');
const app=express();
const csv=require('fast-csv');
const fs=require('fs');
const mongoose=require('mongoose');
const {Data}=require('./Database/mongoose.js');
var stream = fs.createReadStream("DelhiPopulationData.csv");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Data');

app.set('view engine','ejs');//setting ejs as a view engine
//calling fast-csv module to get the data from csv file
csv
 .fromStream(stream, {headers : ["Year", "Population", "GR","Growth"]})
 .on("data", function(data){
    // console.log(data);
     //console.log(data.Year);
     //mongodb datas
     var info=new Data({

     	Year:data.Year,
     	Population:data.Population,
     	GR:data.GR,
     	Growth:data.Growth

     });

     //data saved to mongodb
     info.save().then((infos)=>{

			//console.log("data is saved successfully to the database");
			//console.log(infos);
	},(e)=>{

		res.status(400).send(e)

	});
 });

//get requesting routing
 app.get('/viewData',(req,res)=>{

 		console.log('you made a get request');

		Data.find({}).then((infos)=>{

			//res.send(infos);
			res.render('index.ejs',{

				infos:infos	

			});
			//console.log(infos);
		},(e)=>{

			res.status(400).send(e);

		});
});

app.listen(3000,()=>{
console.log('server is running on port 3000');

});
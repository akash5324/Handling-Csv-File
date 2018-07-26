const mongoose=require('mongoose');
//creating schemas....
var CsvSchema=new mongoose.Schema({

		Year:{type:String,required:true},

		Population:{type:String,required:true},
		
		GR:{type:String,required:true},
		
		Growth:{type:String,required:true}



})

var Data= mongoose.model('Data',CsvSchema);
module.exports={Data};

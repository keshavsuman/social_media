const USER = require('../../models/user');

async function createSkill(req,res){
    try{
        console.log(req.data);
        if(req.body.skills){
            
        }else{

        }
        USER.findById(req.data._id);
    }catch(error){
        console.log(error.message);
        
    }
}

module.exports={
     createSkill
    };
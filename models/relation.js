const cuid =require("cuid")

const db = require('../db')


const Relation =db.model('relation',{
    _id:{type:String,default:cuid},
    name:{type:String,default:true},
    password:{type:String,default:true},
    age:{type:Number,default:true},
    email:{type:String,default:true},
    relation_type:{type:String,default:true},
    user_id:{type:String,default:true},

})


module.exports = {
    create,
    getrelation_in_user, 
    relation_validate,   
    model:Relation
}


async function create(data){

    const realtion = await Relation.create(data)
    return realtion

}


async function getrelation_in_user(id){
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    const getrelation_in_users=await Relation.find({user_id:id})
    return getrelation_in_users
}


async function relation_validate (name,password){
    // console.log(req.body.name,'ajak');
    console.log(name,password);
    const validate =await Relation.findOne({name:name,password:password})
   
    if(validate == null)
    {
    return { success:false}
    }
    else
    {  // password: { type: String, required: true},
  
      return { success:true,data:validate}
    }
}
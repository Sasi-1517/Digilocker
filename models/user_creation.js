const cuid = require('cuid')

const db = require('../db')
const axios = require('axios')

const User = db.model('user_creation', {
  _id: { type: String, default: cuid },
  name: { type: String, required: true },
  password: { type: String, required: true},
  email: { type: String, required: true},
  type: { type: String, required: true},
  

})

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  get2,
  user_validate,
  model: User
}

async function list () {
  const user = await User.find({})
  return user
}  

async function user_validate (id,name) {
  console.log(id ,name);
  const user = await User.findOne({name:id,password:name})
  console.log(user,'20')
  if(user==null)
  {
  return { success:false}
  }
  else
  {  // password: { type: String, required: true},

    return { success:true,data:user}
  }
}  


async function get (_id) {
  const product = await User.findById(_id)
  return product
}

  async function get2 (id) {
    console.log(id,'pp');
    const user = await User.find({ email:id })
    console.log(user,'dsj');
    if(user==null)
    {
    return { success:false}
    }
    else
    {
      return { success:true,data:user}
    }
  }



async function create (fields) {
 
    const product = await User.create(fields)
    return product            
  
}

async function edit (_id, change) {
  const product = await get({ _id })
  Object.keys(change).forEach(function (key) {
    product[key] = change[key]
  })
  await product.save()
  return product
}

async function remove (_id) {
  await User.deleteOne({ _id })
}


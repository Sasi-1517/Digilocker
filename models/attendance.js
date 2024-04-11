const cuid = require('cuid')

const db = require('../db')
const axios = require('axios')

const User = db.model('attendance', {
    _id: { type: String, default: cuid },
    user_name: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    insurance_number: { type: String, required: true },
    admin_id: { type: String, required: true },
    request_id: { type: String, required: true },
    in_date: { type: String, default: 'none' },
    out_date: { type: String, default: 'none' },
    in_time: { type: String, default: 'none' },
    out_time: { type: String, default: 'none' },
})

module.exports = {
    get,
    list,
    listbyclient,
    create,
    edit,
    remove,
    get2,
    model: User
}

async function list() {
    const user = await User.find({})
    return user
}

async function listbyclient(id) {
    const user = await User.find({ admin_id: id })
    return user
}


async function get(_id) {
    const product = await User.findById(_id)
    return product
}

async function get2(id) {
    const user = await User.findOne({ mobile_number: id })
    if (user == null) {
        return { success: false }
    }
    else {
        return { success: true, data: user }
    }
}



async function create(fields) {

    // let temp = await get2(fields.student_name)
    // if (temp.success == false) {
    //   const product = await new User(fields).save()
    //   return product
    // }
    // else {
    //   return "customer ID already exist"
    // }
    const product = await new User(fields).save()
    return product
}

async function edit(_id, change) {
    const product = await get({ _id })
    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })
    await product.save()
    console.log(product);
    return product
}

async function remove(_id) {
    await User.deleteOne({ _id })
}


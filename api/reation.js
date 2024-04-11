const Relation = require('../models/relation');
const autoCatch = require('../lib/auto-catch');

module.exports = autoCatch({
    createrelation,
    realation_get_id,
    relation_vali
    
});

async function createrelation(req, res) {
 
    try {
        const relation = await Relation.create(req.body);
        res.json(relation);
    } catch (error) {
        res.status(500).json({ error: 'Error creating relation' });
    }
}

async function realation_get_id(req,res){
    console.log(req);
    const realation_get_ids=await Relation.getrelation_in_user(req.body.user_id)
    res.json(realation_get_ids)
}


async function relation_vali(req,res){
    console.log(req.body.name,req.body.password);
    const validate = await Relation.relation_validate(req.body.name,req.body.password)
    res.json(validate)
}



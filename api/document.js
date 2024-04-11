const Document = require('../models/document')
const autoCatch = require('../lib/auto-catch')

module.exports=autoCatch({
documentCreate,
document_id,
document_relation
})

async function documentCreate(req,res){

    const documentcreate = await Document.createdocument(req.body)
    res.json(documentcreate)
}


async function document_id(req,res){
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    const document_ids = await Document.documentid(req.body.user_id)
    res.json(document_ids)
}


async function document_relation(req,res){
    console.log(req);
    const { relation_ids, id } = req.body
    const document_relation=await Document.document_relations(id, relation_ids)
    res.json(document_relation)
}


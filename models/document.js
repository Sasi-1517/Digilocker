const cuid =require('cuid')
const db=require('../db')

const Document=db.model('documets',{
    _id:{type:String,default:cuid},
    doc_name:{type:String,default:true},
    pho_no:{type:String,default:true},
    doc_type:{type:String,default:true},
    description:{type:String,default:true},
    doc_file:{type:String,default:true},
    user_id:{type:String,default:true},
    relation_ids:{type:Array,default:[]},
})

async function createdocument(values) {
    try {
        const document = await Document.create(values);
        console.log('Document created:', document);
        return document;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error; 
    }
}

async function documentid(id){
    console.log(id);
    const datas=await Document.find({user_id:id})
    console.log(datas,'09');
    return datas
}

async function document_relations(_id, ids) {
    try {
        const datas = await Document.findOneAndUpdate(
            { _id: _id },
            { $push: { relation_ids: { $each: ids } } },
            { new: true } // To return the updated document
        );
        console.log("Updated Document:", datas);
        return datas; // Return the updated document if needed
    } catch (error) {
        console.error("Error updating document:", error);
        throw error; // Throw error for handling elsewhere if needed
    }
}

module.exports = {
    createdocument,
    documentid,
    document_relations,
    model: Document
};
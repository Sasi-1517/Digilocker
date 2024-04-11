const Document = require('../models/document')
const autoCatch = require('../lib/auto-catch')



const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dvyjguliy",
    api_key: "894283762484691",
    api_secret: "Wy83ms-HWhf7bhlb-x_4-ylmKsk"
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'pdf', // Specify the folder where you want to store the files
    allowedFormats: ['jpg', 'png', 'pdf'] // Specify the allowed file formats
});

// Set up Multer middleware
const upload = multer({ storage: storage });

// Import your Document model if needed
// const Document = require('../models/document');


module.exports=autoCatch({
    createdoc
    })
    

// Define the route to handle file upload
async function createdoc(req, res) {
    try {
        // Access the base64 encoded file data from the request body
        const base64Data = req.body.doc_file;
        console.log('====================================');
        console.log(base64Data);
        console.log('====================================');
        
        // Log the base64Data to inspect its content
        // console.log('Base64 Data:', base64Data);
        
        // Upload base64 data to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(base64Data, { resource_type: 'auto',folder:'pdf',format:"pdf",allowed_formats:['pdf','jpg','png'], secure:true});
        
        // Prepare the data object with the file URL and other fields
        const data = {
            description: req.body.description,
            doc_file: cloudinaryResponse.secure_url,
            doc_name: req.body.doc_name,
            doc_type: req.body.doc_type,
            pho_no: req.body.pho_no
        };

        const values = await Document.createdocument(data);

        // Respond with the saved data
        res.json(values);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
}


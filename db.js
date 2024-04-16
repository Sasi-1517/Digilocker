const mongoose = require('mongoose')

// const URI ='mongodb+srv://bus:bus@cluster0.imsynad.mongodb.net/bus?retryWrites=true&w=majority'
// const URI = "mongodb+srv://abdulsieora:0sjjisQY9J4ketN1@backend.hupih9r.mongodb.net/Digilocker?retryWrites=true&w=majority&appName=Backend"
const URI = "mongodb+srv://lakshmi:Lakshmi%401234@cluster0.te18a1i.mongodb.net/Digilocker"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            URI,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        )
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(`MongoDB error when connecting: ${error}`);
    }
}
connectDB()
module.exports = mongoose

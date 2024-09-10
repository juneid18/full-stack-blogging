import mongoose from "mongoose";

export async function connect() {
    // connecting to Mongoose Database
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () =>{
            console.log('Connection is Succesfull');
        });

        connection.on('error', (err)=>{
            console.log('Error in Connection '+ err);
            process.exit(1)
        })

    } catch (error) {
        console.log("Something went wrong in Database" + error);
        // process.exit(1)
    }
}
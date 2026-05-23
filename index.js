const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');
require('dotenv').config()




app.use(cors())
app.use(express.json())
const port = process.env.PORT

const uri = process.env.MONGODB_URL;




const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// maddlewate

const JWKS= createRemoteJWKSet(
    new URL(`${process.env.CELINT_URL}/api/auth/jwks`)
)


const varifiyToken=async(req,res,next)=>{
const authHeader=req?.headers.authorization
if(!authHeader){
    return res.status(401).json({message: 'Unauthorized'})
}
const token=authHeader.split(' ')[1]
if(!token){
    return res.status(401).json({message: 'Unauthorized'})
}
try{
    const {payload}=await jwtVerify(token,JWKS)
    
}
catch(error){
return res.status(403).json({message: 'Forbidden'})
}
}







async function run() {
    try {

        const db = client.db('doctor-apointment');
        const doctorCollections = db.collection('doctors');
        const bookingCollections = db.collection('booking-appoinment');

        app.get('/all-doctors', async (req, res) => {
            const result = await doctorCollections.find().toArray();
            res.json(result)
        })
        app.get('/all-doctors/:id', async (req, res) => {
            const { id } = req.params;
            const result = await doctorCollections.findOne({ _id: new ObjectId(id) });
            res.json(result)
        })
        /**
         * ! appoinment booking
         */

        app.get('/booking-appoinment',varifiyToken, async (req, res) => {
            const result = await bookingCollections.find().toArray();
            res.json(result)
        })

        app.post('/booking-appoinment', async (req, res) => {
            const bookingdata = req.body;
            const result = await bookingCollections.insertOne(bookingdata);
            res.json(result)

        });
        app.delete('/booking-appoinment/:id', async (req, res) => {
            const { id } = req.params;
            const result = await bookingCollections.deleteOne({_id: new ObjectId(id)});
            console.log(result)
            res.json(result)
        });

app.patch('/booking-appoinment/:id',async(req,res)=>{
    const {id}=req.params;
    const update=req.body;
    const result=await bookingCollections.updateOne({_id:new ObjectId(id)},{$set:update});
    res.json(result)
})

        // await client.connect();

        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

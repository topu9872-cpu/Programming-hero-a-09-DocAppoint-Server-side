const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()




app.use(cors())
const port = 2000

const uri = process.env.MONGODB_URL;




const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {

        const db = client.db('doctor-apointment');
        const doctorCollections = db.collection('doctors');

        app.get('/all-doctors', async (req, res) => {
            const result = await doctorCollections.find().toArray();
            res.json(result)
        })
        app.get('/all-doctors/:id', async (req, res) => {
            const {id}=req.params;
            const result = await doctorCollections.findOne({_id: new ObjectId(id)});
            res.json(result)
        })


        await client.connect();

        await client.db("admin").command({ ping: 1 });
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

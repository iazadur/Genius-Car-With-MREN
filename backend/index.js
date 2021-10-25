const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId

const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// midleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ddn3a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('carMechanic')
        const servicesCollection = database.collection('services')

        // POST API 
        app.post('/services', async(req,res)=>{
            const service = req.body
            const result = await servicesCollection.insertOne(service)
            console.log(result);
            res.json(result)
        })

        // GET API 
        app.get('/service', async (req,res) => {
            const cursor = servicesCollection.find({});
            const result = await cursor.toArray()
            res.json(result)
        })

        // GET Single Service 
        app.get('/service/:id', async (req,res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const service = await servicesCollection.findOne(query)
            res.json(service)
        })

        // DELETE API 
        app.delete('/services/:id', async (req,res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await servicesCollection.deleteOne(query)
            res.json(result)
        })
    }
    finally {
        // await client.close();
    }
}


run().catch(console.dir)






app.get('/', (req, res) => {
    res.send('home page in here')
})

app.listen(port, () => {
    console.log('listening localhost with: ', port);
})
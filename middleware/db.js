import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const client = new MongoClient("mongodb+srv://andy:hong@cluster0.nxetg.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function db(req, res, next) {
  if (!client.isConnected()) await client.connect()
  req.dbClient = client;
  req.db = client.db("tempest")
  return next()
}

const middleware = nextConnect()

middleware.use(db)

export default middleware
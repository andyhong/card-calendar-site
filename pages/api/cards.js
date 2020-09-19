import nextConnect from 'next-connect'
import middleware from '../../middleware/db'

const handler = nextConnect()

handler.use(middleware)

handler.get(async (req, res) => {

  await req.db.collection("cards").find().toArray((err, docs) => {
    res.json(docs)
  })
})

export default handler

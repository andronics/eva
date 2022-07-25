import { MongoBotStorage } from 'botbuilder-storage'
import { MongoClient } from 'mongodb'

export let storage = null

if (process.env.MONGO_URI != '') {

    MongoClient.connect(process.env.MONGO_URI, (err, client) => {
        if (err) { throw err }
        const settings = {
            collection: "your_collection_name",
            ttl: {
                userData: 3600 * 24 * 365,
                conversationData: 3600 * 24 * 7,
                privateConversationData: 3600 * 24 * 7
            }
        }
        let cli = client.db("eva")
        storage = new MongoBotStorage(cli, settings)
    })

}


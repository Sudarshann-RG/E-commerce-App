const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({ endpoint: process.env["COSMOSDB_ENDPOINT"], key: process.env["COSMOSDB_KEY"] });

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const database = client.database("swa-ecommerce-app");
    const container = database.container("Items");

    if(req.method === "GET"){ //return all items
        try {
            const { resources } = await container.items.readAll().fetchAll();
            context.res = {
                status: 200,
                body: resources
            };
        } catch (error) {
            context.res = {
                status: 500,
                body: `Error retrieving items from the database: ${error.message}`
            };
        }
    }
    else if(req.method === "POST"){ //create new item in the database
        try {
            const newItem = req.body;
            const { resource: createdItem } = await container.items.create(newItem);
            context.res = {
                status: 201,
                body: createdItem
            };
        } catch (error) {
            context.res = {
                status: 500,
                body: `Error creating item in the database: ${error.message}`
            };
        }
    }
	//[ POST, PUT AND DELETE ENDPOINTS OMITTED FOR SIMPLICITY, AVAILABLE IN SOURCE CODE ] 
    else {
        context.res = {
            status: 405,
            body: "Method Not Allowed"
        };
    }
}
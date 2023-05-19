const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Create an Express app
const app = express();
app.use(cors());

// Define a route to get the last 5 values
app.get('/data', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient('mongodb+srv://mugilan:mugilan@cluster0.dosw1iz.mongodb.net/');

    // Access the desired database and collection
    await client.connect();
    const db = client.db('mydatabase');
    const collection = db.collection('mycollection');

    // Query the collection for the last 5 documents
    const data = await collection.find().sort('_id', -1).limit(5).toArray();

    client.close();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

// Start the server
const port = 5001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

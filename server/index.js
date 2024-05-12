const sql = require('mssql');
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000; // Set the port number

// Middleware to parse JSON requests
// app.use(bodyParser.json());

const config = {
  user: 'sa',
  password: 'Kings.123',
  server: '127.0.0.1',
  database: 'TnTLogicDB',
  options: {
    encrypt: false // Use this if you're on Windows Azure
  }
};


// sql.connect(config).then(function() {
//   console.log('Connected to the database.');
//   // Perform database operations here
// }).catch(function(err) {
//   console.log('Error connecting to the database:', err);
// });

// Create a connection pool
const pool = new sql.ConnectionPool(config);
pool.connect().then(() => {
  console.log('Connected to the database.');
}).catch(err => console.log('Error connecting to the database:', err));



// -----------------------------Starting of Items Endpoint-----------------------------------

// Route to fetch data from dbo.Items
app.get('/getItems', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);
    console.log('Connected to the database.');

    // Query to fetch ItemID, Name, and SKUNumber from dbo.Items
    const result = await sql.query`SELECT * FROM dbo.Items`;

    // Send the result back to the client
    // res.send(result.recordset);
    // Ensure a response is sent
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

// Endpoint to fetch item master
app.get('/getItemMaster', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);
    console.log('Connected to the database.');

    // Query to fetch ItemID, Name, and SKUNumber from dbo.Items
    const result = await sql.query`SELECT * FROM dbo.ItemMaster`;

    // Send the result back to the client
    // res.send(result.recordset);
    // Ensure a response is sent
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});


// Route to fetch data from dbo.Items based on itemCode
app.get('/getItemDetails/:itemCode', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);
    console.log('Connected to the database.');

    // Extract itemCode from the request parameters
    const itemCode = req.params.itemCode;

    // Query to fetch ItemCode, Name, and SKUNumber from dbo.Items where itemCode matches
    const result = await sql.query`SELECT ItemCode, Name, SKUNumber FROM dbo.Items WHERE ItemCode = ${itemCode}`;

    // Check if any item was found
    if (result.recordset.length > 0) {
      // Send the result back to the client
      res.status(200).json(result.recordset[0]); // Assuming itemCode is unique, so we return the first item found
    } else {
      // If no item was found, send a 404 response
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.log('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});


app.get('/getItemCount/:itemCode', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);
    console.log('Connected to the database.');

    // Extract itemCode from the request parameters
    const itemCode = req.params.itemCode;

    // Query to fetch the count of items with the same itemCode
    const result = await sql.query`SELECT COUNT(*) AS count FROM dbo.Items WHERE ItemCode = ${itemCode}`;

    // Send the count back to the client
    res.status(200).json({ count: result.recordset[0].count });
  } catch (err) {
    console.log('Error fetching item count:', err);
    res.status(500).send('Error fetching item count');
  }
});

// Route to insert data into dbo.Items

app.post('/addItem', async (req, res) => {
  const { itemName, skuNumber, currentDate, itemNumber, itemSelectedID, shift, location } = req.body;

  // Validate input
  if (!itemName || !skuNumber || !itemSelectedID) {
    return res.status(400).send('Missing required fields');
  }

  try {
    // Insert data into the Items table
    await pool.request()
      .input('itemName', sql.NVarChar(255), itemName)
      .input('skuNumber', sql.NVarChar(100), skuNumber)
      .input('itemNumber', sql.NVarChar(255), itemNumber)
      .input('itemMasterID', sql.Int, itemSelectedID) // Using itemSelectedID directly
      .input('currentDate', sql.Date, currentDate)
      .input('shift', sql.NVarChar(255), shift)
      .input('location', sql.NVarChar(255), location)
      .query(`
         INSERT INTO dbo.Items (Name, SKUNumber, ItemNumber, ItemMasterID, date_created, Shift)
         VALUES (@itemName, @skuNumber, @itemNumber, @itemMasterID, CONVERT(DATE, @currentDate), @shift)
       `);

    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Route to insert data into dbo.Items

app.post('/addItembyMachines', async (req, res) => {
  const { machineName, machineLocation, selectedItemName, sku, currentDate, itemNumber, itemSelectedID, shift, batchCode, prodDetails } = req.body;

  try {
    // Get the name of the location with ID 1
    const locationNameResult = await pool.request()
      .input('locationID', sql.Int, 1) // Assuming location with ID 1
      .query(`SELECT Name FROM dbo.locations WHERE LocationID = @locationID`);

    // Check if location name was found
    if (!locationNameResult.recordset.length) {
      return res.status(400).send('Location with ID 1 not found');
    }

    const locationName = locationNameResult.recordset[0].Name;

    // Insert data into the Items table
    await pool.request()
      .input('machineName', sql.NVarChar(255), machineName)
      .input('machineLocation', sql.NVarChar(100), machineLocation)
      .input('sku', sql.NVarChar(100), sku)
      .input('selectedItemName', sql.NVarChar(255), selectedItemName)
      .input('itemNumber', sql.NVarChar(255), itemNumber)
      .input('itemMasterID', sql.Int, itemSelectedID) // Using itemSelectedID directly
      .input('currentDate', sql.Date, currentDate)
      .input('shift', sql.NVarChar(255), shift)
      // .input('location', sql.NVarChar(255), locationName)
      .input('batchcode', sql.NVarChar(255), batchCode)
      .input('prodDetails', sql.NVarChar(255), prodDetails)
      .query(`
         INSERT INTO dbo.Items (MachineName, Location, SKUNumber, ItemNumber, ItemCode, ItemMasterID, date_created, Shift, BatchCode, ProductionDetails)
         VALUES (@machineName, @machineLocation, @sku, @itemNumber, @itemNumber, @itemMasterID, CONVERT(DATE, @currentDate), @shift, @batchCode, @prodDetails)
       `);

    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Insert Data into Item Master Table
app.post('/addItemMaster', async (req, res) => {
  const { itemName, skuNumber, itemCode } = req.body;

  // Validate input
  if (!itemName || !skuNumber) {
    return res.status(400).send('Missing required fields');
  }

  try {

    // Insert data into the Items Master table
    await pool.request()
      .input('itemName', sql.NVarChar(255), itemName)
      .input('skuNumber', sql.NVarChar(50), skuNumber)
      // .input('itemCode', sql.NVarChar(50), itemCode)
      .query(`
         INSERT INTO dbo.ItemMaster (ItemDesc, SKU)
         VALUES (@itemName, @skuNumber)
       `);

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding item to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint for fetching the Items Master table
app.get('/items-master', async (req, res) => {
  try {
    // Query to fetch all rows from the tags table
    const result = await pool.query('SELECT * FROM ItemMaster');
    // Send the fetched data as a JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching tags:', error);
    // If there's an error, send a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal server error' });
  }
});
// ------------------------------------------------End of Items Endpoint -------------------------------

// -----------------------------Starting of Packing Endpoint-----------------------------------

// Route to fetch data from dbo.Packing
app.get('/getPackingItems', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);
    console.log('Connected to the database.');

    // Query to fetch ItemID, Name, and SKUNumber from dbo.Packing
    const result = await sql.query`SELECT PItemID, PItemMasterID, PItemNumber, PItemDate, PItemTagID, PItemStatus, PItemNotes FROM dbo.PackItems`;

    // Send the result back to the client
    // res.send(result.recordset);
    // Ensure a response is sent
    res.status(200).json(result.recordset);
  } catch (err) {
    console.log('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

// Route to insert data into dbo.Packing

app.post('/addPackingItem', async (req, res) => {
  const { currentDate, itemNumber, itemSelectedID } = req.body;

  // Validate input
  if (!currentDate || !itemNumber || !itemSelectedID) {
    return res.status(400).send('Missing required fields');
  }

  try {
    // Insert data into the Packing table
    await pool.request()
      .input('itemNumber', sql.NVarChar(50), itemNumber)
      .input('itemMasterID', sql.Int, itemSelectedID) // Using itemSelectedID directly
      .input('currentDate', sql.NVarChar(50), currentDate)
      .query(`
         INSERT INTO dbo.PackItems (PItemNumber, PItemMasterID, PItemDate)
         VALUES (@itemNumber, @itemMasterID, CONVERT(DATE, @currentDate))
       `);

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding item to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Insert Data into Packing Master Table
app.post('/addPackingMaster', async (req, res) => {
  const { itemName, itemCode, pItemDescription, itemType, pItemCategory, pItemUnit, pItemCap, pItemCost } = req.body;

  // Validate input
  if (!itemName || !itemCode) {
    return res.status(400).send('Missing required fields');
  }

  try {
    // Insert data into the Packing Master table
    await pool.request()
      .input('itemName', sql.NVarChar(255), itemName)
      .input('itemCode', sql.NVarChar(50), itemCode)
      // .input('pItemDescription', sql.NVarChar(255), pItemDescription)
      .input('itemType', sql.NVarChar(50), itemType)
      // .input('pItemCategory', sql.NVarChar(255), pItemCategory)
      // .input('pItemUnit', sql.NVarChar(50), pItemUnit)
      // .input('pItemCap', sql.NVarChar(255), pItemCap)
      // .input('pItemCost', sql.NVarChar(50), pItemCost)
      .query(`
         INSERT INTO dbo.PackItemMaster (PItemName, PItemCode, PItemType)
         VALUES (@itemName, @itemCode, @itemType)
       `);

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding item to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint for fetching the Packing Master table
app.get('/packing-master', async (req, res) => {
  try {
    // Query to fetch all rows from the tags table
    const result = await pool.query('SELECT * FROM PackItemMaster');
    // Send the fetched data as a JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching tags:', error);
    // If there's an error, send a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal server error' });
  }
});


// // Endpoint for inserting the data into Tags Table
// app.post('/savePackTag', async (req, res) => {
//   const { BarCode, QRCode, NFC, RFID, TagStatus = 'active', ItemNumber } = req.body;

//   try {
//     // Step 1: Insert the tag into the Tags table and get the generated TagID
//     const insertTagsQuery =
//       // .input('BarCode', sql.NVarChar(255), BarCode)
//       // .input('QRCode', sql.NVarChar(255), QRCode)
//       // .input('NFC', sql.NVarChar(255), NFC)
//       // .input('RFID', sql.NVarChar(255), RFID)
//       // .input('TagStatus', sql.NVarChar(255), TagStatus)
//       `
//          INSERT INTO dbo.Tags (Barcode, QRCode, NFC, RFID, TagStatus)
//          OUTPUT INSERTED.TagID
//          VALUES (@BarCode, @QRCode, @NFC, @RFID, @TagStatus)
//        `;

//     const result = await pool.request()
//       .input('Barcode', sql.NVarChar(255), BarCode)
//       .input('QRCode', sql.NVarChar(255), QRCode)
//       .input('NFC', sql.NVarChar(255), NFC)
//       .input('RFID', sql.NVarChar(255), RFID)
//       .input('TagStatus', sql.NVarChar(255), TagStatus)
//       .query(insertTagsQuery);

//     const tagId = result.recordset[0].TagID

//     // Step 2: Update the PackItems table with the TagID based on ItemNumber
//     const updatePackItemsQuery = `
//    UPDATE PackItems
//    SET PItemTagID = @TagID
//    WHERE PItemNumber = @ItemNumber;
// `;
//     await pool.request()
//       .input('TagID', sql.Int, tagId)
//       .input('ItemNumber', sql.Int, ItemNumber)
//       .query(updatePackItemsQuery);

//     res.status(200).send({ message: 'Tags inserted and PackItems updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: 'An error occurred while inserting data' });
//   }
// });

app.post('/savePackTag', async (req, res) => {
  const { BarCode, QRCode, NFC, RFID, TagStatus = 'active', ItemNumber, ResType = 'Packing' } = req.body;

  try {
    // Step 1: Insert the tag into the Tags table and get the generated TagID
    const result = await pool.request()
      .input('BarCode', sql.NVarChar(255), BarCode)
      .input('QRCode', sql.NVarChar(255), QRCode)
      .input('NFC', sql.NVarChar(255), NFC)
      .input('RFID', sql.NVarChar(255), RFID)
      .input('TagStatus', sql.NVarChar(255), TagStatus)
      .input('ResType', sql.NVarChar(50), ResType)
      .input('ItemNumber', sql.Int(50), ItemNumber)
      .query(`
          INSERT INTO dbo.Tags (BarCode, QRCode, NFC, RFID, TagStatus, ResType, ResNumber)
          OUTPUT INSERTED.TagID
          VALUES (@BarCode, @QRCode, @NFC, @RFID, @TagStatus, @ResType, @ItemNumber)
        `);

    console.log('Insert result:', result);

    const tagId = result.recordset[0].TagID;
    console.log('TagID:', tagId);

    // Step 2: Update the PackItems table with the TagID based on ItemNumber
    const updatePackItemsQuery = `
       UPDATE PackItems
       SET PItemTagID = @TagID
       WHERE PItemNumber = @ItemNumber;
     `;

    const itemExists = await pool.request()
      .input('ItemNumber', sql.Int, ItemNumber)
      .query(`SELECT * FROM PackItems WHERE PItemNumber = @ItemNumber`);

    if (itemExists.recordset.length === 0) {
      console.error('Item with ItemNumber:', ItemNumber, 'not found in PackItems');
      return res.status(400).json({ error: 'Item not found' });
    }

    await pool.request()
      .input('TagID', sql.Int, tagId)
      .input('ItemNumber', sql.Int, ItemNumber) // Assuming ItemNumber is an integer
      .query(updatePackItemsQuery);

    console.log('PackItems update successful');

    res.status(201).json({ message: 'Tag inserted and PackItems updated successfully' });
  } catch (error) {
    console.error('Error adding tag or updating PackItems:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to fetch machines table
// Endpoint for fetching the Packing Master table
app.get('/machines', async (req, res) => {
  try {
    // Query to fetch all rows from the tags table
    const result = await pool.query('SELECT * FROM Machines');
    // Send the fetched data as a JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching machines:', error);
    // If there's an error, send a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Endpoint for inserting the data into Tags Table
// app.post('/savePackTag', async (req, res) => {
//   const { BarCode, QRCode, NFC, RFID, TagStatus = 'active', itemNumber } = req.body;

//   try {
//     // Step 1: Insert the tag into the Tags table and get the generated TagID
//     const result = await pool.request()
//       .input('BarCode', sql.NVarChar(255), BarCode)
//       .input('QRCode', sql.NVarChar(255), QRCode)
//       .input('NFC', sql.NVarChar(255), NFC)
//       .input('RFID', sql.NVarChar(255), RFID)
//       .input('TagStatus', sql.NVarChar(255), TagStatus)
//       .query(`
//          INSERT INTO dbo.Tags (BarCode, QRCode, NFC, RFID, TagStatus)
//          OUTPUT INSERTED.TagID
//          VALUES (@BarCode, @QRCode, @NFC, @RFID, @TagStatus)
//        `);

//     console.log('Insert result:', result);

//     const tagId = result.recordset[0].TagID;
//     console.log('TagID:', tagId);
//     // Step 2: Insert the new item into the Items table using the TagID
//     const itemResult = await pool.request()
//       .input('itemNumber', sql.NVarChar(255), itemNumber)
//       .query(`
//          SELECT PItemID FROM dbo.PackItems WHERE PItemNumber = @itemNumber
//        `);

//     // const pItemId = itemResult.recordset[0].PItemID;

//     const insertItemQuery =
//       ` UPDATE dbo.PackItems 
//     SET PItemTagID = @tagID
//     WHERE PItemNumber = @ItemNumber
//    `;

//     console.log('Item insertion successful', insertItemQuery);

//     await pool.request()
//       .input('tagId', sql.Int, tagId)
//       .input('itemNumber', sql.NVarChar(255), itemNumber)
//       .query(insertItemQuery)

//     res.status(201).json({ message: 'Tag and item added successfully' });
//   } catch (error) {
//     console.error('Error adding tag or item to the database:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// ------------------------------------------------End of Packing Endpoint -------------------------------





// Endpoint for fetching the tags table
app.get('/tags', async (req, res) => {
  try {
    // Query to fetch all rows from the tags table
    const result = await pool.query('SELECT * FROM tags');
    // Send the fetched data as a JSON response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching tags:', error);
    // If there's an error, send a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal server error' });
  }
});

// -----Endpoint to fetch tags details based on user input
// Endpoint to receive barcode value from frontend
// Function to query the database
// Assuming poolPromise is your connection pool promise

// Connect to the database
// sql.connect(config).then(() => {
//   console.log('Connected to the database');
// }).catch(err => {
//   console.error('Error connecting to the database:', err);
// });
// ---------------------------------------------------------------------------------------------------------
// fetch packing table data based on tag id
// app.get('/api/packing', async (req, res) => {
//   try {
//     const { tagId } = req.query;
//       const result = await pool.query(`
//           SELECT packItems.*
//           FROM packItems
//           JOIN Tags ON packItems.PItemTagID = Tags.TagID
//           WHERE Tags.TagID = '${tagId}'
//       `);

//       // Convert result.recordset to an array
//       const items = Array.isArray(result.recordset) ? result.recordset : [result.recordset];

//       if (items.length > 0) {
//           res.json(items);
//       } else {
//           res.status(404).json({ error: 'No items found' });
//       }
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // fetch items table data based on tag id
// app.get('/api/items', async (req, res) => {
//   try {
//     const { tagId } = req.query;
//       const result = await pool.query(`
//           SELECT items.*
//           FROM items
//           JOIN Tags ON items.TagID = Tags.TagID
//           WHERE Tags.TagID = '${tagId}'
//       `);

//       // Convert result.recordset to an array
//       const items = Array.isArray(result.recordset) ? result.recordset : [result.recordset];

//       if (items.length > 0) {
//           res.json(items);
//       } else {
//           res.status(404).json({ error: 'No items found' });
//       }
//   } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Endpoint to send the user input to the backend api
// app.post('/api/send-input', async (req, res) => {
//   const { tagId } = req.body; // Access tagId from request body

//   try {
//     // Logic to fetch details based on tagId (combine logic from existing endpoints)
//     let query;
//     if (result.recordset.length > 0) {
//       query = `
//         SELECT items.*
//         FROM items
//         JOIN Tags ON items.TagID = Tags.TagID
//         WHERE Tags.TagID = '${tagId}'
//       `;
//     } else {
//       query = `
//         SELECT packItems.*
//         FROM packItems
//         JOIN Tags ON packItems.PItemTagID = Tags.TagID
//         WHERE Tags.TagID = '${tagId}'
//       `;
//     }

//     const result = await pool.query(query);
//     const items = Array.isArray(result.recordset) ? result.recordset : [result.recordset];

//     if (items.length > 0) {
//       res.json(items);
//     } else {
//       res.status(404).json({ error: 'No items found' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// Removed endpoints for clarity (assuming separate logic isn't needed)

// Endpoint to receive user input and send combined response
app.post('/search', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const searchTerm = req.body.searchTerm;

    // Query to search in both items and packItems tables
    // const query = `
    //  SELECT ItemID AS ID, Name, ItemCode, SKUNumber, TagID, 'Item' AS Source FROM items WHERE TagID = ${searchTerm}
    //  UNION ALL
    //  SELECT PItemID AS ID, PItemName, NULL AS SKUNumber, PItemTagID, 'PackItem' AS Source FROM packItems WHERE PItemTagID = ${searchTerm}

    //  `;
    const query = `
     SELECT PItemID, PItemName, PItemTagID, PItemNumber, ResType FROM packItems WHERE PItemTagID = ${searchTerm}
     `;

    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// // endpoint for child search input
// app.post('/search2', async (req, res) => {
//   try {
//     const pool = await sql.connect(config);
//     const searchTerm = req.body.searchTerm;

//     // Query to search in both items and packItems tables
//     const query = `
//      SELECT * FROM items WHERE ItemCode = @searchTerm
//      `;

//     const result = await pool.request()
//     .input('searchTerm', sql.VarChar, searchTerm)
//     .query(query);
//     res.json(result.recordset);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// Endpoint for child search input
app.post('/search2', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const searchTerm = req.body.searchTerm; // Assuming itemCode is sent here

    // Fetch data from items table
    const query1 = `
      SELECT *
      FROM items
      WHERE itemCode = @searchTerm
    `;

    const itemResults = await pool.request()
      .input('searchTerm', sql.VarChar, searchTerm)
      .query(query1);

    if (itemResults.recordset.length === 0) {
      return res.status(404).send('Item not found'); // Handle item not found
    }

    // Array to store combined data
    const combinedData = [];

    // Loop through each item and fetch details from ItemsMaster
    for (const item of itemResults.recordset) {
      const sku = item.SKUNumber; // Assuming SKU is the matching field

      const query2 = `
        SELECT *
        FROM ItemMaster
        WHERE SKU = @sku
      `;

      const itemMasterResult = await pool.request()
        .input('sku', sql.VarChar, sku)
        .query(query2);

      if (itemMasterResult.recordset.length === 0) {
        // Handle missing item in ItemsMaster (optional)
        console.warn(`Item with SKU ${sku} not found in ItemsMaster`);
      } else {
        const itemDetails = itemMasterResult.recordset[0];
        combinedData.push({ ...item, ...itemDetails }); // Combine data
      }
    }

    res.json(combinedData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});





// ----------------------------------------------------------------------------------------
// // Endpoint to receive barcode value from frontend
// app.post('/api/sendDetails', async (req, res) => {
//   const { barcode } = req.body;
//   console.log('Received barcode:', barcode);

//   try {
//     const details = await getDetailsFromDatabase(barcode);
//     if (details) {
//       res.json(details);
//     } else {
//       res.status(404).send('Details not found');
//     }
//   } catch (error) {
//     console.error('Error fetching details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// // Endpoint to fetch details based on barcode or tagID
// app.get('/api/fetchDetails', async (req, res) => {
//   try {
//     // Extract barcode and tagID from query parameters
//     const { barcode, tagID } = req.query;

//     // If neither barcode nor tagID is provided, return an error
//     if (!barcode && !tagID) {
//       return res.status(400).json({ error: 'Either barcode or tagID must be provided' });
//     }

//     // Use the getDetailsFromDatabase function to fetch details
//     const details = await getDetailsFromDatabase(barcode || tagID);

//     if (details) {
//       // If details are found, return them as a JSON response
//       res.json(details);
//     } else {
//       // If no details are found, return a 404 Not Found response
//       res.status(404).send('Details not found');
//     }
//   } catch (error) {
//     console.error('Error fetching details:', error);
//     // If there's an error, send a 500 Internal Server Error response
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// app.post('/saveTag', async (req, res) => {
//   const { BarCode, QRCode, NFC, RFID, TagStatus='active' } = req.body;

//   try {
//      // Use the pool to execute the SQL query
//      await pool.request()
//        .input('BarCode', sql.NVarChar(255), BarCode)
//        .input('QRCode', sql.NVarChar(255), QRCode)
//        .input('NFC', sql.NVarChar(255), NFC)
//        .input('RFID', sql.NVarChar(255), RFID)
//        .input('TagStatus', sql.NVarChar(255), TagStatus) // Add this line
//        .query(`
//           INSERT INTO dbo.Tags (BarCode, QRCode, NFC, RFID, TagStatus)
//           VALUES (@BarCode, @QRCode, @NFC, @RFID, @TagStatus)
//         `);

//      res.status(201).json({ message: 'Tag added successfully' });
//   } catch (error) {
//      console.error('Error adding tag to the database:', error);
//      res.status(500).json({ error: 'Internal server error' });
//   }
//  });

app.post('/saveTag', async (req, res) => {
  const { BarCode, QRCode, NFC, RFID, TagStatus = 'active', ItemNumber, ResType = 'Item' } = req.body;

  try {
    // Step 1: Insert the tag into the Tags table and get the generated TagID
    const result = await pool.request()
      .input('BarCode', sql.NVarChar(255), BarCode)
      .input('QRCode', sql.NVarChar(255), QRCode)
      .input('NFC', sql.NVarChar(255), NFC)
      .input('RFID', sql.NVarChar(255), RFID)
      .input('TagStatus', sql.NVarChar(255), TagStatus)
      .input('ResType', sql.NVarChar(50), ResType)
      .input('ItemNumber', sql.Int(50), ItemNumber)
      .query(`
         INSERT INTO dbo.Tags (BarCode, QRCode, NFC, RFID, TagStatus, ResType, ResNumber)
         OUTPUT INSERTED.TagID
         VALUES (@BarCode, @QRCode, @NFC, @RFID, @TagStatus, @ResType, @ItemNumber)
       `);

    console.log('Insert result:', result);

    const tagId = result.recordset[0].TagID;
    console.log('TagID:', tagId);
    // Step 2: Insert the new item into the Items table using the TagID
    // const itemResult = await pool.request()
    //   .input('ItemNumber', sql.NVarChar(255), ItemNumber)
    //   .query(`
    //      SELECT ItemID FROM dbo.Items WHERE ItemNumber = @ItemNumber
    //    `);

    // const itemId = itemResult.recordset[0].ItemID;

    const insertItemQuery =
      ` UPDATE dbo.Items 
    SET TagID = @TagID
    WHERE ItemNumber = @ItemNumber
   `;

    console.log('Item insertion successful', insertItemQuery);


    const itemExists = await pool.request()
      .input('ItemNumber', sql.Int, ItemNumber)
      .query(`SELECT * FROM Items WHERE ItemNumber = @ItemNumber`);

    if (itemExists.recordset.length === 0) {
      console.error('Item with ItemNumber:', ItemNumber, 'not found in PackItems');
      return res.status(400).json({ error: 'Item not found' });
    }

    await pool.request()
      .input('TagID', sql.Int, tagId)
      .input('ItemNumber', sql.Int, ItemNumber)
      .query(insertItemQuery)

    res.status(201).json({ message: 'Tag and item added successfully' });
  } catch (error) {
    console.error('Error adding tag or item to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//-----------------scanning panel's endpoint---------------------------------
// Insert Data into AssociateResources Table
app.post('/associate', async (req, res) => {
  const { mainResID, mainResName, mainResNumber, associateRes, TagStatus = 'active', ResType = 'Item', mainResDate, mainResTagID, mainResMasterID } = req.body;

  // Validate input
  if (!mainResID || !mainResName || !associateRes || !Array.isArray(associateRes)) {
    return res.status(400).send('Missing required fields or associateRes is not an array');
  }

  console.log(associateRes);

  // Declare transaction outside the try...catch block
  const transaction = new sql.Transaction(pool);

  try {
    // Start a transaction
    await transaction.begin();

    // Iterate over each associateRes item and insert into the AssociateResources table
    for (const associate of associateRes) {
      await transaction.request()
        .input('mainResID', sql.Int, mainResID)
        .input('mainResName', sql.NVarChar(255), mainResName)
        .input('associateResID', sql.Int, associate.associateResID)
        .input('associateResName', sql.NVarChar(255), associate.associateResName)
        .input('associateResLocation', sql.NVarChar(255), associate.associateResLocation)
        .input('associateResMachineName', sql.NVarChar(255), associate.associateResMachineName)
        .input('associateResItemCode', sql.NVarChar(255), associate.associateResItemCode)
        .input('associateResBatchCode', sql.NVarChar(255), associate.associateResBatchCode)
        .input('associateResProductionDetails', sql.NVarChar(255), associate.associateResProductionDetails)
        .query(`
            INSERT INTO dbo.AssociateResources (MainResID, MainResName, AssociateResID, AssociateResName, LocationName, MachineName, ItemCode, BatchCode, ProductionDetails, UpdateDt, Status)
            VALUES (@mainResID, @mainResName, @associateResID, @associateResName, @associateResLocation, @associateResMachineName, @associateResItemCode, @associateResBatchCode, @associateResProductionDetails, GETDATE(), 1)
          `);

      // Then, move the item from "items" table to "itemsAttached" table
      await pool.request()
        .input('associateResID', sql.Int, associate.associateResID)
        .query(`
          INSERT INTO dbo.itemsAttached ( ItemNumber, date_created, Name, SKUNumber, TagID, Photo, Shift, ParentID, ItemMasterID, ResType, LinksID, DateAndTimeAttached, Location, MachineName, ItemCode, BatchCode, ProductionDetails) -- Include all columns that match between the two tables
          SELECT ItemNumber, date_created, Name, SKUNumber, TagID, Photo, Shift, ParentID, ItemMasterID, ResType, LinksID, GETDATE() AS DateAndTimeAttached, Location, MachineName, ItemCode, BatchCode, ProductionDetails FROM dbo.items
          WHERE ItemId = @associateResID;

          DELETE FROM dbo.items
          WHERE ItemId = @associateResID;
        `);

      // Insert into packItemsAttached table
      await pool.request()
        .input('mainResMasterID', sql.Int, mainResMasterID)
        .input('mainResTagID', sql.Int, mainResTagID)
        .input('mainResName', sql.NVarChar(255), mainResName)
        .input('mainResNumber', sql.NVarChar(255), mainResNumber)
        .input('TagStatus', sql.NVarChar(255), TagStatus)
        .input('ResType', sql.NVarChar(50), ResType)
        .input('date', sql.Date, mainResDate)
        .query(`
          INSERT INTO dbo.packItemsAttached (PItemMasterID, PItemNumber, PItemName, PItemDate, PItemStatus, PItemTagID, ResType)
          VALUES (@mainResMasterID, @mainResNumber, @mainResName, @date, 1, @mainResTagID, @ResType);
        `);
      // Delete from packItems table (assuming you have an identifier for the record to delete)
      await transaction.request()
        .input('mainResID', sql.Int, mainResID) // Replace with your identifier for deletion
        .query(`
    DELETE FROM dbo.packItems
    WHERE PItemID = @mainResID;
  `);

      // Insert into tags table
      await pool.request()
        .input('associateResItemCode', sql.NVarChar(255), associate.associateResItemCode)
        .input('TagStatus', sql.NVarChar(255), TagStatus)
        .input('ResType', sql.NVarChar(50), ResType)
        .query(`
          INSERT INTO dbo.tags (TagID, Barcode, QRCode, NFC, RFID, ResNumber, TagActivateDate, ResType, TagStatus)
          VALUES (@associateResItemCode, @associateResItemCode, @associateResItemCode, @associateResItemCode, @associateResItemCode, @associateResItemCode, GETDATE(), @ResType, @TagStatus);
        `);
    } // Correct placement of closing brace for the for loop

    // Commit the transaction
    await transaction.commit();
    console.log('Transaction committed successfully.');

    console.log('Received data:', req.body);
    res.status(201).json({ message: 'Associations added successfully' });
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.error('Error in transaction, rolling back.', error);
    console.error('Error adding associations to the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//---------------------------end of scanning panel endpoint-------------------------- 





// // Define a route for testing
// app.get('/', (req, res) => {
//     res.send('Hello World! This is your Express server.');
//   });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

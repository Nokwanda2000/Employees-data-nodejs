const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors'); // Import the CORS middleware

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your Firebase service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend access
}));
app.use(express.json()); // Middleware to parse JSON

// Welcome message on the root route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Employee Management API!');
});

// Add Employee (with a photo URL instead of uploading a file)
app.post('/employees', async (req, res) => {
  try {
    const { id, name, email, phone, position, imageUrl } = req.body;
    
    if (!id || !name || !email || !phone || !position) {
      return res.status(400).send('All fields are required!');
    }

    const employeeData = { 
      id, 
      name, 
      email, 
      phone, 
      position, 
      imageUrl: imageUrl || '',  // Use a default empty string if no image URL is provided
    };

    // Log the document path being used
    console.log('Document path:', `employees/${id}`);

    await db.collection('employees').doc(id).set(employeeData);

    res.status(201).send('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Get all Employees
app.get('/employees', async (req, res) => {
  try {
    const snapshot = await db.collection('employees').get();
    const employees = snapshot.docs.map(doc => doc.data());
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a specific Employee
app.get('/employees/:id', async (req, res) => {
  try {
    const doc = await db.collection('employees').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).send('Employee not found');
    }
    res.status(200).json(doc.data());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Employee
app.put('/employees/:id', async (req, res) => {
  try {
    const { name, email, phone, position, imageUrl } = req.body;
    const updatedData = { name, email, phone, position, imageUrl };

    await db.collection('employees').doc(req.params.id).update(updatedData);
    res.status(200).send('Employee updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete Employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const doc = await db.collection('employees').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).send('Employee not found');
    }

    await db.collection('employees').doc(req.params.id).delete();
    res.status(200).send('Employee deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

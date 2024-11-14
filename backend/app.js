const express = require('express');
const admin = require('firebase-admin');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project-id.appspot.com'  // Make sure to replace with your actual bucket
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Welcome message on the root route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Employee Management API!');
});

// Add Employee
app.post('/api/employees', upload.single('photo'), async (req, res) => {
  try {
    const { name, surname, age, idNumber, role } = req.body;

    // Upload photo to Firebase Storage
    const blob = bucket.file(`photos/${idNumber}`);
    const blobStream = blob.createWriteStream({ resumable: false });
    blobStream.end(req.file.buffer);

    // Save employee data in Firestore
    const employeeData = { 
      name, 
      surname, 
      age, 
      idNumber, 
      role, 
      photoUrl: blob.publicUrl() 
    };
    await db.collection('employees').doc(idNumber).set(employeeData);

    res.status(201).send('Employee added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all Employees
app.get('/api/employees', async (req, res) => {
  try {
    const snapshot = await db.collection('employees').get();
    const employees = snapshot.docs.map(doc => doc.data());
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a specific Employee
app.get('/api/employees/:id', async (req, res) => {
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
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { name, surname, age, role } = req.body;
    const updatedData = { name, surname, age, role };
    await db.collection('employees').doc(req.params.id).update(updatedData);
    res.status(200).send('Employee updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete Employee and their photo
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const doc = await db.collection('employees').doc(req.params.id).get();
    if (doc.exists) {
      const photoUrl = doc.data().photoUrl;
      const file = bucket.file(photoUrl); // Get file reference from photoUrl
      await file.delete(); // Delete file from Firebase Storage
    }
    await db.collection('employees').doc(req.params.id).delete(); // Delete employee from Firestore
    res.status(200).send('Employee and associated file deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

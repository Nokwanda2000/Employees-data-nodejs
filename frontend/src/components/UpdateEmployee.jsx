import React, { useState, useEffect } from 'react';

function UpdateEmployee({ addEmployee, updateEmployee, currentEmployee, setCurrentEmployee }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    image: null, // Change to null to hold the uploaded file
  });

  useEffect(() => {
    if (currentEmployee) {
      setFormData(currentEmployee);
    } else {
      setFormData({
        id: '',
        name: '',
        email: '',
        phone: '',
        position: '',
        image: null, // Reset to null for a new employee
      });
    }
  }, [currentEmployee]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); // Store the file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { ...formData };

    // If an image is uploaded, create a FileReader to read the file for preview
    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        employeeData.image = reader.result; // Convert the file to base64 string for storage
        // Proceed with update or add
        if (currentEmployee) {
          updateEmployee(employeeData); // Update the employee details
        } else {
          addEmployee(employeeData); // Add a new employee
        }
      };
      reader.readAsDataURL(formData.image); // Read the file
    } else {
      // If no image is uploaded, proceed directly with the update or add
      if (currentEmployee) {
        updateEmployee(employeeData); // Update the employee details
      } else {
        addEmployee(employeeData); // Add a new employee
      }
    }

    // Reset the form after submission
    setFormData({
      id: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      image: null, // Reset image to null
    });
    setCurrentEmployee(null); // Clear the current employee
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">{currentEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {currentEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
}

export default UpdateEmployee;

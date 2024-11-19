import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    imageUrl: '',
  });
  const [preview, setPreview] = useState(null); // For image preview
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.id) {
      alert('Employee ID is required!');
      return;
    }
  
    const formDataToSend = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      imageUrl: formData.imageUrl || '', // Optional image URL
    };
  
    try {
      const response = await axios.post('http://localhost:5000/employees', formDataToSend);
      alert('Employee added successfully!');
      navigate('/employeespage');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error adding employee');
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md max-w-lg w-full flex p-6">
        <div className="flex-shrink-0 w-1/3 flex justify-center items-center">
          {preview ? (
            <img src={preview} alt="Employee Preview" className="w-32 h-32 rounded-full object-cover" />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>
        <div className="flex-grow p-4">
          <h2 className="text-xl font-semibold text-center text-black mb-6">Employee Registration</h2>
          <p className="text-red-500 text-center mb-4">Please register using your details</p>
          <hr className="mb-4" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">Employee ID</label>
              <input
                type="text"
                name="id"
                id="id"
                value={formData.id}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                id="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Employee Photo</label>
              <input
                type="file"
                name="imageUrl"
                id="imageUrl"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none">Register Employee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

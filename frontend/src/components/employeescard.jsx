import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch employees from the backend API on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.id.includes(searchTerm)
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      // Update the local state to reflect the deleted employee
      setEmployees(employees.filter((employee) => employee.id !== id));
      alert('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateEmployee/${id}`); // Navigate to the UpdateEmployee page with the employee ID
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employee List</h2>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul className="space-y-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <li key={employee.id} className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition duration-200">
              <div className="flex-shrink-0 w-16 h-16">
                {employee.imageUrl ? (
                  <img src={employee.imageUrl} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">No Photo</span>
                  </div>
                )}
              </div>
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p>ID: {employee.id}</p>
                <p>Position: {employee.position}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdate(employee.id)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No employees found.</p>
        )}
      </ul>
    </div>
  );
}

export default EmployeeList;

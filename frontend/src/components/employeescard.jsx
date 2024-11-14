import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateEmployee from './UpdateEmployee';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // Retrieve employees from the backend when the page loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Function to add a new employee
  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  // Function to update an existing employee
  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
    setCurrentEmployee(null); // Clear the form after updating
  };

  // Function to delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Filter employees based on the search term
  const filteredEmployees = employees.filter((employee) =>
    employee.id.includes(searchTerm)
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employee List</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Employee Form for Adding/Updating Employees */}
      {currentEmployee && (
        <UpdateEmployee
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          currentEmployee={currentEmployee}
          setCurrentEmployee={setCurrentEmployee}
        />
      )}

      {/* Employee List */}
      <ul className="space-y-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <li key={employee.id} className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition duration-200">
              <div className="flex-shrink-0 w-16 h-16">
                {employee.photoUrl ? (
                  <img src={employee.photoUrl} alt={employee.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-gray-800">{employee.name}</h3>
                <p className="text-gray-600">{employee.position}</p>
                <span className="text-gray-500">{employee.id}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => setCurrentEmployee(employee)}>Edit</button>
                <button
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                  onClick={() => deleteEmployee(employee.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No employees found.</p>
        )}
      </ul>
    </div>
  );
}

export default EmployeeList;

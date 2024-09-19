import React, { useState, useEffect } from 'react';
import { listEmployees, updateEmployee, deleteEmployee, addEmployee } from '../../../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListEmployeeComponent.css';
import Sidebar from '../Sidebar';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formValues, setFormValues] = useState({ firstName: '', lastName: '', email: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', email: '' });
  const employeesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch employees. Please try again later.');
      });
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);
    setFormValues({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      updateEmployee(editingEmployee, formValues)
        .then(() => {
          alert('Employee updated successfully');
          setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
              employee.id === editingEmployee ? { ...employee, ...formValues } : employee
            )
          );
          setEditingEmployee(null);
          setFormValues({ firstName: '', lastName: '', email: '' });
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
          alert('Failed to update employee. Please try again later.');
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id)
        .then(() => {
          alert('Employee deleted successfully');
          setEmployees((prevEmployees) => prevEmployees.filter(employee => employee.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee. Please try again later.');
        });
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    addEmployee(newEmployee)
      .then(() => {
        alert('Employee added successfully');
        fetchEmployees();
        setShowAddModal(false);
        setNewEmployee({ firstName: '', lastName: '', email: '' });
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again later.');
      });
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="list-employee-container full-width">
      <Sidebar />
      <div className="container-fluid mt-5">
        <h2 className="text-center mb-4">Liste des Employés</h2>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
            Ajouter un employé
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.length ? (
                currentEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button
                        className="btn btn-primary mr-2"
                        onClick={() => navigate(`/employees/${employee.id}`)}
                      >
                        Voir Profil
                      </button>
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => handleEdit(employee)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Aucun employé trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;

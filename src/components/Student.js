/* import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  const handlePostClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    axios
      .post('http://localhost:8080/student/add', student)
      .then(() => {
        console.log('Succesfully added');
        fetchStudents();
        setAddress('');
        setName('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/student/delete/${id}`).then(() => {
      alert('Succesfully removed');
      fetchStudents();
    });
  };

  const fetchStudents = () => {
    axios
      .get('http://localhost:8080/student/getAll')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <div style={paperStyle}>
        <h1>Add Student</h1>
        <form style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="name">Student Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="address">Student Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            />
          </div>

          <button
            type="submit"
            onClick={handlePostClick}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6200ea',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Add Student
          </button>
        </form>
      </div>

      <div style={paperStyle}>
        <h1>Students List</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', margin: '2px' }}>No</th>
              <th style={{ border: '1px solid black', margin: '2px' }}>Name</th>
              <th style={{ border: '1px solid black', margin: '2px' }}>Address</th>
              <th style={{ border: '1px solid black', margin: '2px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', margin: '2px' }}>{index + 1}</td>
                <td style={{ border: '1px solid black', margin: '2px' }}>{student.name}</td>
                <td style={{ border: '1px solid black', margin: '2px' }}>{student.address}</td>
                <td style={{ border: '1px solid black', margin: '2px' }}>
                  <button
                    onClick={() => handleDelete(student.id)}
                    style={{
                      marginTop: '8px',
                      marginBottom: '8px',
                      padding: '10px 20px',
                      backgroundColor: 'blue',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
 */

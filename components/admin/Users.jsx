import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users/signup');
            // console.log(response.data.user);
            setUsers(response.data.user);
            setIsDelete(false);
        } catch (error) {
          console.error('There was an error fetching the users!', error);
        }
      };
  
      fetchUsers();
  }, [isDelete]);

  const handleDelete = async (id) => {
    try {
      const response = axios.delete(`/api/users/${id}`);
      toast.success("User Deleted");
      setIsDelete(true);
    } catch (error) {
      console.error("Error Deleting Products:", error);
    }
  };

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell><MdOutlineDelete onClick={() => handleDelete(user._id)} style={{cursor:"pointer"}}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;

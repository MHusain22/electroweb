import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductList = ({ update }) => {
  const [productData, setProductData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = axios.delete(`/api/products/${id}`);
      console.log(response.data);
      toast.success("Product Deleted");
      setIsDelete(true);
    } catch (error) {
      console.error("Error Deleting Products:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Products");
        setProductData(response.data.product);
        setIsDelete(false);
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchData();
  }, [isDelete, update]);

  return (
    <TableContainer component={Paper}>
      <Toaster position="top-right" reverseOrder={false} />
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Company</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Image
                  src={item.image}
                  width={60}
                  height={60}
                  alt={item.name}
                />
              </StyledTableCell>
              <StyledTableCell align="right">{item.price}</StyledTableCell>
              <StyledTableCell align="right">{item.company}</StyledTableCell>
              <StyledTableCell align="right">{item.category}</StyledTableCell>
              <StyledTableCell align="right">
                <MdOutlineDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(item._id)}
                  size={20}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;

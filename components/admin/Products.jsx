import React, { useState } from 'react';
import {
  Container, TextField, Button, Box, MenuItem, Typography, Grid, Paper, InputLabel
} from '@mui/material';
import axios from 'axios';
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import ProductList from './ProductList';

const categories = [
  'PHONES',
  'HEADPHONES',
  'CAMERA',
  'SMARTWATCHES',
  'PLAYSTATION',
  'LAPTOPS'
];
const initialState = {
  name: '',
  image: '',
  category: '',
  company: '',
  price: '',
  description: ''
}
const Products = () => {
  const [productDetails, setProductDetails] = useState(initialState);
  const [update,setUpdate] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    // Handle form submission
    e.preventDefault();
    console.log(productDetails);
    try {
        const response = await axios.post('/api/Products',productDetails); //passing the data
        console.log("product saved Success", response.data);
        toast.success("Product saved succesfull");
        setUpdate(true);
        setProductDetails(initialState);
      } catch (error) {
        toast.error("req failed");
        console.log("req failed", error.message);
      }
  };

  return (
    <Container maxWidth="md">
        <Toaster position="top-right" reverseOrder={false} />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Product
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={productDetails.name}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Image URL"
                  name="image"
                  value={productDetails.image}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={productDetails.category}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={productDetails.company}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={productDetails.price}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={productDetails.description}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <ProductList update={update}/>
    </Container>
  );
};

export default Products;

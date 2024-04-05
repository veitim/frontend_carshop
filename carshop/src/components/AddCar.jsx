import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddCar(props) {
    const [car, setCar] = useState({brand: '', model:'', color:'', fuel:'', modelYear: '', price: ''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const newCar = () => {
      props.addCar(car);
      setCar({brand: '', model:'', color:'', fuel:'', modelYear: '', price: ''})
    }

    const handleInputChange = event => {
      setCar({...car, [event.target.name]: event.target.value});
    }
  
    return (
      <React.Fragment>
        <Button variant="outlined" color='secondary' onClick={handleClickOpen}>
          Add new car
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              newCar();
              handleClose();
            },
          }}
        >
          <DialogTitle>New Car</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              name="brand"
              value={car.brand}
              onChange={handleInputChange}
              label="Brand"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="model"
              value={car.model}
              onChange={handleInputChange}
              label="Model"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="color"
              value={car.color}
              onChange={handleInputChange}
              label="Color"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="fuel"
              value={car.fuel}
              onChange={handleInputChange}
              label="Fuel"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="modelYear"
              value={car.modelYear}
              onChange={handleInputChange}
              label="Year"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="price"
              value={car.price}
              onChange={handleInputChange}
              label="Price"
              type="number"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}

export default AddCar;
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditCar(props) {
    const [car, setCar] = useState({brand: '', model:'', color:'', fuel:'', modelYear: '', price: ''});
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      console.log(props.car);
      setCar({brand: props.car.brand, model: props.car.model, color: props.car.color, fuel: props.car.fuel, modelYear: props.car.modelYear, price: props.car.price})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const updateCar = () => {
      props.updateCar(car, props.car._links.self.href)
    };

    const handleInputChange = event => {
      setCar({...car, [event.target.name]: event.target.value});
    }
  
    return (
      <React.Fragment>
        <Button onClick={handleClickOpen}>
          Edit
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
              updateCar();
              handleClose();
            },
          }}
        >
          <DialogTitle>Edit Car</DialogTitle>
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
            <Button type="submit">Edit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}

export default EditCar;
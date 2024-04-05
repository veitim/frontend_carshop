import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList() {
    const [cars, setCars] = useState([]);

    useEffect(() => {fetchData()}, []);

    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        console.log(cars);
    };

    const deleteCar = href => {
      const options = {
        method: 'delete'
      }
      fetch(href, options)
      .then(() => fetchData())
      .catch(error => console.error(error))
    };

    const addCar = car => {
      const options = {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(car)
      }
      fetch('https://carrestservice-carshop.rahtiapp.fi/cars', options)
      .then(fetchData)
      .catch(error => console.error(error))
    };

    const updateCar = (car, link) => {
      const options = {
        method: 'put',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(car)
      }
      fetch(link, options)
      .then(fetchData)
      .catch(error => console.error(error))
    };

    const [columnDefs, setColumnDefs] = useState([
        {field: 'brand', sortable: true, filter: true, floatingFilter: true},
        {field: 'model', sortable: true, filter: true, floatingFilter: true},
        {field: 'color', sortable: true, filter: true, floatingFilter: true},
        {field: 'fuel', sortable: true, filter: true, floatingFilter: true},
        {field: 'modelYear', headerName: 'Year', sortable: true, filter: true, floatingFilter: true},
        {field: 'price', sortable: true, filter: true, floatingFilter: true},
        {
          field: '_links.self.href',
          sortable: false, 
          headerName: '',
          cellRenderer: row => <EditCar updateCar={updateCar} car={row.data}/>
        },
        {
          field: '_links.self.href',
          sortable: false,  
          headerName: '',
          cellRenderer: ({value}) => <Button variant="outlined" color="error" onClick={() => deleteCar(value)}>Delete</Button>
        }
      ]);

    const autoSizeStrategy = {
        type: 'fitGridWidth',
        defaultMinWidth: 100,
    };

    return (
        <div style={{textAlign: 'center'}}>
            <AddCar addCar={addCar}/>
            <div className="ag-theme-material" style={{width: 1400, height: 1000, textAlign: 'left'}}>
            <AgGridReact 
              rowData={cars}
              columnDefs={columnDefs}
              autoSizeStrategy={autoSizeStrategy}
              rowSelection="single"
            />
          </div>
        </div>
    );
}

export default CarList;
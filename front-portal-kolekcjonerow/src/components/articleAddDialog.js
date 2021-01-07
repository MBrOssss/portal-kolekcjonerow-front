import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import userService from '../services/user.service';

export default function FormDialog(props) {
  const { title, children, openPopup, onClose} = props;

  const initialValues = {
    tytul: '',
    opis: '',
    idAutora: ''
  }

  const [values, setValues] = useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
  }
  
  function handleSubmit() {
    userService.addArtykul(values);
  }

  return (
    <div>
      <Dialog 
        open={openPopup} 
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Dodaj artykuł
          </DialogContentText>
            <Grid>
              <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
              <TextField
                        name="tytul"
                        label="Tytul"
                        value={values.tytul}
                        onChange={handleInputChange}
                    />
                    <TextField
                        placeholder="Opis"
                        name="opis"
                        multiline
                        rows={6}
                        value={values.opis}
                        onChange={handleInputChange}
                        variant="outlined"
                    />
                    <Button type="submit" onClick={onClose} color="primary">
                      Add
                    </Button>
                    <Button onClick={onClose} color="primary">
                      Close
                    </Button>
              </form>  
            </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
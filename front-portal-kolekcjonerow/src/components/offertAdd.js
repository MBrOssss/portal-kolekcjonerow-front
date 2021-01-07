import React, { useState } from "react";
import userService from '../services/user.service';
import { useHistory } from 'react-router'

const initialValues = {
    tytul: '',
    opis: '',
    idSprzedawcy: '',
    idKupujacego: '11',
    //imageName: '',
    status: 'Dodana',
    date: null
};

export default function OffertAdd() {
  const [values, setValues] = useState(initialValues);
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
      console.log(values);
      userService.addOferta(values);
      //history.push('/Oferty');
  }

  return (
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <label>
                Tytul:
                <input
                value={values.tytul}
                onChange={handleInputChange}
                name="tytul"
                />
            </label>
            <label>
                Opis:
                <input
                value={values.opis}
                onChange={handleInputChange}
                name="opis"
                />
            </label>
          <input type="submit" value="Submit" />
        </form>
  );
}
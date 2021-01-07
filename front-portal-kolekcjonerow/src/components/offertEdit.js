import React, { useState, useEffect } from "react";
import userService from '../services/user.service';
import { useHistory } from 'react-router'

export default function OffertEdit(props) {
  const history = useHistory();
  const [offert, setOffert] = useState([]);

  useEffect(() => {
    const fetchOffert = async () => {
        await userService.getOferta(props.location.state.idOferty).then((response) => {
            setOffert(response.data)
        });
    }

    fetchOffert();
    console.log(offert)
    }, [offert.idOferty]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOffert({
            ...offert,
        [name]: value,
        });
  };

  const handleSubmit = (e) => {
      console.log(offert);
      userService.editOferta(offert);
      //history.push('/Oferty');
  }

  return (
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <label>
                Tytul:
                <input
                value={offert.tytul}
                onChange={handleInputChange}
                name="tytul"
                />
            </label>
            <label>
                Opis:
                <input
                value={offert.opis}
                onChange={handleInputChange}
                name="opis"
                />
            </label>
          <input type="submit" value="Submit" />
        </form>
  );
}
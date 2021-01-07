import React, { useState, useEffect } from "react";
import userService from '../services/user.service';
import { useHistory } from 'react-router'

export default function MocAdd(props) {
  const history = useHistory();
  const [moc, setMoc] = useState([]);

  useEffect(() => {
    const fetchMoc = async () => {
        await userService.getMoc(props.location.state.idBudowli).then((response) => {
            setMoc(response.data)
        });
    }

    fetchMoc();
    console.log(moc)
    }, [moc.idBudowli]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMoc({
            ...moc,
        [name]: value,
        });
  };

  const handleSubmit = (e) => {
      console.log(moc);
      userService.editMoc(moc);
      //history.push('/Oferty');
  }

  return (
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <label>
                Tytul:
                <input
                value={moc.tytul}
                onChange={handleInputChange}
                name="tytul"
                />
            </label>
            <label>
                Opis:
                <input
                value={moc.opis}
                onChange={handleInputChange}
                name="opis"
                />
            </label>
          <input type="submit" value="Submit" />
        </form>
  );
}
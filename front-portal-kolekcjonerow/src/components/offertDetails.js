import React, { useEffect, useState } from 'react';
import userService from '../services/user.service';

const OffertDetails = (props) => {
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

    return(
        <div>
            <h1>{offert.idOferty}</h1>
            <h1>{offert.tytul}</h1>
            <h1>{offert.opis}</h1>
            <h1>{offert.idSprzedawcy}</h1>
            <h1>{offert.idKupujacego}</h1>
            <h1>{offert.date}</h1>
        </div>
    );
}

export default OffertDetails
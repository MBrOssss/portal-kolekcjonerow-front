import React, { useEffect, useState } from 'react';
import userService from '../services/user.service';

const MocDetails = (props) => {
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

    return(
        <div>
            <h1>{moc.idBudowli}</h1>
            <h1>{moc.tytul}</h1>
            <h1>{moc.opis}</h1>
            <h1>{moc.idAutora}</h1>
            <h1>{moc.date}</h1>
        </div>
    );
}

export default MocDetails
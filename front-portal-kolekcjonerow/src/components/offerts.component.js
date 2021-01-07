import React, { Component } from 'react';
import userService from '../services/user.service';
import AuthService from '../services/auth.service';
import OffertCard from './offertCard';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default class Offert extends Component {

    state = {
        offerts: []
    }

    constructor() {
        super();
    }

    handleToggle(){
        this.props.history.push({ 
            pathname: '/OffertAdd'
           });
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        userService.getOferty().then(
            (response) => {
                this.setState(
                    {
                        offerts : response.data
                    },
                    function() {
                        console.log('Pomyślnie pobrano oferty');
                        console.log(this.state.offerts)
                    }
                );
            },
            (error) => {
                this.setState(
                    {
                        offerts : (error.response && error.response.data) || error.message || error.toString()
                    },
                    function() {
                        console.log('nie udalo sie pobrac ofert');
                    }
                );
            }
        );
    }

    render() {

        return (
            <div>
                { AuthService.getCurrentUserRole() == "Admin" ?(
                        <div>
                        <Button variant="contained" onClick={() => this.handleToggle()} startIcon={<AddIcon/>}>
                            Dodaj
                        </Button>
                        <br></br>
                        <br></br>
                        </div>
                    ):null
                    }
                {this.state.offerts ? (
                    <div>
                        <Grid container spacing={3} style={{padding: 24}} >
                            { this.state.offerts.map(off => (
                                <Grid key={off.idOferty} item xs={12}>
                                    <OffertCard offert={off} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No offers found" }
            </div>
        )
    }
}
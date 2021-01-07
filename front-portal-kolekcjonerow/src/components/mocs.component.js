import React, { Component } from 'react';
import userService from '../services/user.service';
import AuthService from '../services/auth.service';
import MocCard from './mocCard';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default class Mocs extends Component {

    state = {
        mocs: []
    }

    constructor() {
        super();
    }

    handleToggle(){
        this.props.history.push({ 
            pathname: '/MocAdd'
           });
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        userService.getMocs().then(
            (response) => {
                this.setState(
                    {
                        mocs : response.data
                    },
                    function() {
                        console.log('Pomyślnie pobrano budowle');
                        console.log(this.state.mocs)
                    }
                );
            },
            (error) => {
                this.setState(
                    {
                        mocs : (error.response && error.response.data) || error.message || error.toString()
                    },
                    function() {
                        console.log('nie udalo sie pobrac budowli');
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
                {this.state.mocs ? (
                    <div>
                        <Grid container spacing={3} alignItems="stretch" style={{padding: 24}}>
                            { this.state.mocs.map(moc => (
                                <Grid key={moc.idBudowli} item xs="auto">
                                    <MocCard mocCard={moc} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No mocs found" }
            </div>
        )
    }
}
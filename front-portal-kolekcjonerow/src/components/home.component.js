import React, { Component } from 'react';
import userService from '../services/user.service';
import AuthService from '../services/auth.service';
import Article from './articleCard';
import Grid from '@material-ui/core/Grid';
import Popup from './articleAddDialog';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export default class Home extends Component {

    state = {
        articles: [],
        openPopup: false
    }

    constructor() {
        super();
    }

    handleToggle(){
        this.setState({
            openPopup : !this.state.openPopup
        });
        console.log(this.state.openPopup)
    }

    componentDidMount() {
        const user = AuthService.getCurrentUserRole();

        userService.getArtykuly().then(
            (response) => {
                this.setState(
                    {
                        articles : response.data
                    },
                    function() {
                        console.log('Pomyślnie pobrano artykuly');
                        console.log(this.state.articles)
                    }
                );
            },
            (error) => {
                this.setState(
                    {
                        articles : (error.response && error.response.data) || error.message || error.toString()
                    },
                    function() {
                        console.log('nie udalo sie pobrac artykulow');
                    }
                );
            }
        );
    }

    render() {
        return (
            <Grid style={{padding: 10}}>
                <div id="article">
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
                
                {this.state.articles ? (
                    <div>
                        <Grid container spacing={4} alignItems="stretch" justify="space-around" > {/* <Grid container spacing={8} style={{padding: 24}} > */}
                            { this.state.articles.map(art => (
                                <Grid key={art.idArtykulu} item xs="auto">
                                    <Article article={art} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No articles found" }

                <Popup title="Article Form" openPopup={this.state.openPopup} onClose={() => this.handleToggle()}>
                </Popup>
            </div>
            </Grid>
            
            
        )
    }
}
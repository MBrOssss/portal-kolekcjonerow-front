import axios from 'axios';
import jwt_decode from "jwt-decode";

const API_URL_ART = 'https://localhost:44342/artykuly/';
const API_URL_OF = 'https://localhost:44342/oferty/';
const API_URL_USER = 'https://localhost:44342/api/token/';
const API_URL_MOCS = 'https://localhost:44342/wlasnebudowle/';

class UserService {

    getArtykuly() {
        return axios.get(API_URL_ART, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    addArtykul(art) {
        if(JSON.parse(localStorage.getItem('user'))){
            var token = JSON.parse(localStorage.getItem('user'));
            var decoded = jwt_decode(token);
            art.idAutora = decoded.id;
        }
        
        return axios.post(API_URL_ART, art, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    deleteArtykul(id){
        return axios.delete(API_URL_ART + id, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    getOferty() {
        return axios.get(API_URL_OF, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    getOferta(id) {
        return axios.get(API_URL_OF + id, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    async addOferta(of) {
        if(JSON.parse(localStorage.getItem('user'))){
            var token = JSON.parse(localStorage.getItem('user'));
            var decoded = jwt_decode(token);
            of.idSprzedawcy = decoded.id;
        }

        try {
            const response = await axios.post(API_URL_OF, of, {
                headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')) }
            });
            console.log(response);
        } catch (error) {
            console.log(error.response);
        };
    }

    deleteOferta(id){
        return axios.delete(API_URL_OF + id, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    async editOferta(of) {
        if(JSON.parse(localStorage.getItem('user'))){
            var token = JSON.parse(localStorage.getItem('user'));
        }

        try {
            const response = await axios.put(API_URL_OF + of.idOferty, of, {
                headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')) }
            });
            console.log(response);
        } catch (error) {
            console.log(error.response);
        };
    }

    getMocs() {
        return axios.get(API_URL_MOCS, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    getMoc(id) {
        return axios.get(API_URL_MOCS + id, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    deleteMoc(id){
        return axios.delete(API_URL_MOCS + id, { headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))}
        });
    }

    async addMoc(moc) {
        if(JSON.parse(localStorage.getItem('user'))){
            var token = JSON.parse(localStorage.getItem('user'));
            var decoded = jwt_decode(token);
            moc.idAutora = decoded.id;
        }

        try {
            const response = await axios.post(API_URL_MOCS, moc, {
                headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')) }
            });
            console.log(response);
        } catch (error) {
            console.log(error.response);
        };
    }

    async editMoc(moc) {
        if(JSON.parse(localStorage.getItem('user'))){
            var token = JSON.parse(localStorage.getItem('user'));
            //var decoded = jwt_decode(token);
            //moc.idAutora = decoded.id;
        }

        try {
            const response = await axios.put(API_URL_MOCS + moc.idBudowli, moc, {
                headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')) }
            });
            console.log(response);
        } catch (error) {
            console.log(error.response);
        };
    }
}

export default new UserService();
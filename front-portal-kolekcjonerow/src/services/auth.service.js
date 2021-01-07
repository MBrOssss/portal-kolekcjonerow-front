import axios from 'axios';
import jwt_decode from "jwt-decode";

const API_URL = 'https://localhost:44342/api/token/';

class AuthService {
	login(username, password) {
		return axios
			.post(API_URL + 'Login', {
				username,
				password
			})
			.then((response) => {
				if (response.data) {
					localStorage.setItem('user', JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	logout() {
		localStorage.removeItem('user');
		console.log('usunieta');
	}

	register(username, email, password) {
		return axios.post(API_URL + 'Register', {
			username,
			email,
			password
		});
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'));
	}

	getCurrentUserRole() {
		if(JSON.parse(localStorage.getItem('user'))){
            var token = JSON.parse(localStorage.getItem('user'));
			var decoded = jwt_decode(token);
			
			console.log(decoded.role);
			return decoded.role;
		}
	}
}

export default new AuthService();

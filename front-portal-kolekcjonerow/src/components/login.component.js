import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
// import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../services/auth.service';
import { ThemeProvider, createMuiTheme, Typography, FormControl, InputLabel } from '@material-ui/core';
import styles from './login.module.css';

const required = (value) => {
	if (!value) {
		return (
			<div className="alert alert-danger" role="alert">
				This field is required!
			</div>
		);
	}
};

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			username : '',
			password : '',
			loading  : false,
			message  : ''
		};
	}

	componentDidMount () {
		const script = document.createElement("script");
	
		script.src = "main.js";
		script.async = true;
	
		document.body.appendChild(script);
	}

	onChangeUsername(e) {
		this.setState({
			username : e.target.value
		});
	}

	onChangePassword(e) {
		this.setState({
			password : e.target.value
		});
	}

	handleLogin(e) {
		e.preventDefault();

		this.setState({
			message : '',
			loading : true
		});

		this.form.validateAll();

		if (this.checkBtn.context._errors.length === 0) {
			AuthService.login(this.state.username, this.state.password).then(
				() => {
					this.props.history.push('/');
					window.location.reload();
				},
				(error) => {
					const resMessage =
						(error.response && error.response.data && error.response.data.message) ||
						error.message ||
						error.toString();

					this.setState({
						loading : false,
						message : resMessage
					});
				}
			);
		}
		else {
			this.setState({
				loading : false
			});
		}
	}

	render() {
		return (
// 			<div class="container" id="container">
// 	<div class="form-container sign-up-container">
// 		<form action="#">
// 			<h1 class ="form-container-h1">Utwórz nowe konto</h1>
// 			<input type="text" placeholder="Nazwa użytkownika" />
// 			<input type="email" placeholder="Email" />
// 			<input type="password" placeholder="Hasło" />
// 			<button>Zarejestruj</button>
// 		</form>
// 	</div>
// 	<div class="form-container sign-in-container">
// 		<form action="#">
// 			<h1 class ="form-container-h1">Zaloguj</h1>
// 			<input type="email" placeholder="Email" />
// 			<input type="password" placeholder="Hasło" />
// 			<a href="#">Zapomniałeś hasła?</a>
// 			<button>Zaloguj</button>
// 		</form>
// 	</div>
// 	<div class="overlay-container">
// 		<div class="overlay">
// 			<div class="overlay-panel overlay-left">
// 				<h1>Witaj!</h1>
// 				<p>Jeśli posiadasz już konto możesz się zalogować z jego użyciem</p>
// 				<button class="ghost" id="signIn">Logowanie</button>
// 			</div>
// 			<div class="overlay-panel overlay-right">
// 				<h1>Witaj!</h1>
// 				<p>Jeśli jeszcze nie posiadasz konta, zarejestruj się i dołącz do naszej przygody w świecie lego!</p>
// 				<button class="ghost" id="signUp">Rejestracja</button>
// 			</div>
// 		</div>
// 	</div>
// </div>
			<div>
				<div className={styles.bgcolor}>
					<div className={styles.divstyle}>
						<br />
						<h1>Zaloguj się</h1>
						<img
							src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
							alt="profile-img"
							className="profile-img-card"
							className={styles.imgmargin}
						/>

						<Form
							className={styles.fromstyle}
							onSubmit={this.handleLogin}
							ref={(c) => {
								this.form = c;
							}}
						>
							<div className="form-group">
								<label htmlFor="username">Login</label>
								<Input
									type="text"
									className="form-control"
									name="username"
									value={this.state.username}
									onChange={this.onChangeUsername}
									validations={[ required ]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Hasło</label>
								<Input
									type="password"
									className="form-control"
									name="password"
									value={this.state.password}
									onChange={this.onChangePassword}
									validations={[ required ]}
								/>
							</div>

							<div className="form-group">
								<button
									className="btn btn-primary"
									style={{ width: '100%', backgroundColor: '#2196f3', color: 'aliceblue' }}
									disabled={this.state.loading}
								>
									{this.state.loading && <span className="spinner-border spinner-border-sm" />}
									<span>Zaloguj się</span>
								</button>
							</div>

							{this.state.message && (
								<div className="form-group">
									<div className="alert alert-danger" role="alert">
										{this.state.message}
									</div>
								</div>
							)}
							<CheckButton
								style={{ display: 'none' }}
								ref={(c) => {
									this.checkBtn = c;
								}}
							/>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

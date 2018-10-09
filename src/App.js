import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import CreditCardInput from 'react-credit-card-input';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';


const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: theme.spacing.unit / 4
	}
});

const paises = require('country-list')().getNames();

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			tipo: '',nombre: '',email: '',pais: '',id: '',cardNum: '',cardExp: '',cardCvv: '',subs: false, anchorEl: null
		};
	}

	componentDidMount () {
		const url = 'https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones/';
		fetch(url)
			.then((res) => res.json())
			.then((json) => this.setState({ id: json.length }));

		ValidatorForm.addValidationRule('isCompleteName', (value) => {
			if (value.indexOf(' ') === -1) {

				return false;
			}
			return true;
		});
	}
	handleChange = (event) => { this.setState({ [event.target.name]: event.target.value });};
	postData = () => {
		fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(this.objectToPost)
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log('Objeto posteado:', data.html_url);
				this.thanks();
			})
			.catch((error) => {
				console.log(error, 'catch the hoop');
			});
	};
	thanks = () => {
		this.setState({ subs: true });
	};
	resetValue = () => {
		this.setState({
			tipo: '',nombre: '',email: '',pais: '',cardNum: '',cardExp: '',cardCvv: ''});
	};

	backToForm = () => {
		this.setState({ subs: false });
	};
	handleClose = () => {
		this.setState({ anchorEl: null });
	  };
	  handleClick2 = event => {
		this.setState({ anchorEl: event.currentTarget });
	  };

	render () {
		const { classes } = this.props;
		const {
			nombre, pais, cardNum, cardExp, cardCvv, tipo, email, subs,anchorEl } = this.state; let isEnabled;

		if (tipo === 'premium') {
			isEnabled =
				email.length > 0 && tipo.length > 0 && nombre.length > 0 && pais.length > 0 && cardNum.length > 0 && cardExp.length > 0 && cardCvv.length > 0;

			this.objectToPost = {
				tipo: this.state.tipo.toLowerCase(),
				nombre: this.state.nombre.toLowerCase(),
				email: this.state.email.toLowerCase(),
				pais: this.state.pais.toLowerCase(),
				cardNum: this.state.cardNum,
				cardExp: this.state.cardExp,
				cardCvv: this.state.cardCvv
			};
		} else {
			isEnabled =
				email.length > 0 && tipo.length > 0 && nombre.length > 0 && pais.length > 0;
				
			this.objectToPost = {
				tipo: this.state.tipo.toLowerCase(),
				nombre: this.state.nombre.toLowerCase(),
				email: this.state.email.toLowerCase(),
				pais: this.state.pais.toLowerCase()
			};
		}

		const isEnabledCancelButton =
			email.length > 0 || tipo.length > 0 || nombre.length > 0 || pais.length > 0;
// render() 
    return (
      <div className="App">
		  <h1>SUBSCRIPCION</h1>
          <img src={logo} className="App-logo" alt="logo" />
		  <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick2}
        >
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Gladys Ari</MenuItem>
          <MenuItem onClick={this.handleClose}>felicidad medina</MenuItem>
          <MenuItem onClick={this.handleClose}>IFTS16</MenuItem>
        </Menu>
      </div> 
        {!subs ? (
			<div className='main'>
						<div className='container'>
				<div className='tipo'>
								<form className={classes.root} autoComplete='off'>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor='age-helper'>TIPO</InputLabel>
										<Select
											value={this.state.tipo} onChange={this.handleChange} input={<Input name='tipo' id='age-helper' />}
										>
											<MenuItem value={'free'}>FREE(0)</MenuItem>
											<MenuItem value={'premium'}>PREMIUM(U$$10)</MenuItem>
										</Select>
										
									</FormControl>
								</form>
							</div>
							<div className='datos'>
								<form>
									<ValidatorForm
										ref='form' onSubmit={this.handleSubmit} onError={(errors) => console.log(errors)}
									>
										<TextValidator
											label='Nombre y Apellido' onChange={this.handleChange} name='nombre' value={nombre} validators={[ 'required', 'isCompleteName' ]}errorMessages={[ 'campo requerido', 'recuerde ingresar nombre y apellido']}
										/>
									</ValidatorForm>
								</form>
								<form className='row-2'>
									<ValidatorForm
										ref='form' onSubmit={this.handleSubmit} onError={(errors) => console.log(errors)}>

										<TextValidator
											label='Email' onChange={this.handleChange} name='email' value={email} validators={[ 'required', 'isEmail' ]} errorMessages={[ 'campo requerido', 'email inválido' ]}/>
									</ValidatorForm>
									<FormControl className={classes.formControl}>
										<InputLabel htmlFor='age-helper'>PAIS</InputLabel>
										
										<Select
											value={this.state.pais} onChange={this.handleChange} input={<Input name='pais' id='age-helper' />}> {paises.map((pais) => (
												<MenuItem key={pais} value={pais}>
													{pais}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</form>
							</div>

							{tipo === 'premium' && (<div className='tarjeta'>
									<CreditCardInput cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
											<input {...props} onChange={handleCardCVCChange((e) => this.setState({ cardCvv: e.target.value }))}/>)}
										cardExpiryInputRenderer={({handleCardExpiryChange,props}) => (
											<input {...props} onChange={handleCardExpiryChange((e) => this.setState({ cardExp: e.target.value }))}/>)}
										cardNumberInputRenderer={({handleCardNumberChange,props}) => (
											<input {...props} onChange={handleCardNumberChange((e) => this.setState({ cardNum: e.target.value }))}/>)}/>

									<Cards
							            number={this.state.cardNum} name={this.state.nombre} expiry={this.state.cardExp} cvc={this.state.cardExp} focused={0}/></div>)}
						</div>
						<div className='buttons'>
							<Button type='button'
								id='subscript-button'
								variant='contained'
								color='primary'
								className={classes.button}
								disabled={!isEnabled}
								onClick={this.postData}
								//onClick={this.thanks}
							>
								ENVIAR
							</Button>

							<Button
								id='cancel-button'
								variant='contained'
								color='primary'
								className={classes.button}
								disabled={isEnabledCancelButton}
								onClick={this.resetValue}
							>
								CANCELAR
							</Button>
						</div>
					</div>
				) : (
					<div>
						<Button
							type='button'
							id='back-button'
							variant='contained'
							color='primary'
							className={classes.button}
							onClick={this.backToForm}
						>
							Volver
						</Button>
					</div>
				)}

			</div>
		);
	}	
} 
	
export default withStyles(styles)(App);
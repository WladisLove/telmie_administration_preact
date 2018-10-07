import { h, Component } from 'preact';

import style  from './style.css'


export default class LogInForm extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
    }
    
    componentWillReceiveProps(){
		this.setState({loading: false})
	}

    logIn = () => {
		this.props.logIn(window.btoa(this.state.email + ':' + this.state.password));
		this.setState({loading: true})
    }

    keyPressHandler = (e) => (e.key === 'Enter') && this.logIn();

    onChange= (e) => {
        const {name, value} = e.target;
		this.setState({[name]: value});
    }
    
    render(props, {email, password, loading}){

        return loading ? (
            <div>Loading...</div>
        ) : (
            <div class={style.logInForm}>
                
                { this.props.logInFailure && (
                    <div class={style.failure}>
                        Sorry, your login details are not correct
                    </div>
                )}

                <div>
					<label for="email">Email</label>
					<input type="text" name="email" value={email} onChange={this.onChange}/>
				</div>
				<div>
					<label for="password">Password</label>
					<input type="text" name="password" type="password" onKeyPress={this.keyPressHandler} value={password} onChange={this.onChange} />
				</div>
				<button onClick={this.logIn}>Log in</button>
            </div>
        );
    }
}
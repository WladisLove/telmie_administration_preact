import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import LogInForm from '../../components/log-in-form'
import Redirect from '../../components/redirect'

import { routes } from '../../components/app'
import { logIn, checkIfLoggedIn } from '../../store/actions/user'

class LogIn extends Component {

    render() {
        return (Object.keys(this.props.userData).length === 0 
                || !checkIfLoggedIn()) ? (
            <div class='route-content'>
                <h1>Log in</h1>

                <LogInForm 
                    logInFailure={this.props.logInFailure}
                    logIn={this.props.logIn} />
            </div>
        ) : (
            <Redirect to={routes.HOME}/>
        )
    }
}
const mapStateToProps = (state) => ({
    userData: state.loggedInUser,
    logInFailure: state.logInFailure,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	logIn,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LogIn);
import { h, Component } from 'preact';
import Card from '../card'
import Select from '../select'
import Input from '../input'
import EmojiField from 'emoji-picker-textfield';
import { confirmAlert } from 'react-confirm-alert';
import { sendPush, sendEmail } from '../../store/api/notifications'

import 'react-confirm-alert/src/react-confirm-alert.css'
import style from './style.css'

class MessagesArea extends Component{
	constructor(props){
		super(props);

        this.state = {
            unified: '',
            emailTag: '',
        }
    }
    
    selectPush = () => this.setState({ pushArea: true, emailArea: false });
    selectEmail = () => {
        this.clearPushMes();
        this.setState({ pushArea: false, emailArea: true });
    };

    /*onSelecPushType = (e) => {
        console.log('[onSelecPushType]');
    }*/
    onPushMesChange = (e, value) => {
        const unified = this._field.getImages(value); 
        this._field.state.value = this._field.getUnicode(value);
        this.setState({ unified });
    }
    clearPushMes = () => {
        this.setState({ unified: '' });
        this._field && ( this._field.state.value = '' );
    }

    onPushConfirm = () => confirmAlert({
        customUI: ({ onClose }) => (
            <div class={"confirmModal"}>
                <p class={"confirmTitle"}>Do you want to send push notifications?</p>
                <button class={"confirmOkBtn"} onClick={this.pushConfirmSending(onClose)}>Yes</button>
                <button class={"confirmCancelBtn"} onClick={onClose}>No</button>
            </div>
        )
    });

    pushConfirmSending = (onClose) => async () => {
        this.setState({ pushError: false, pushErrorMsg: ''});
        sendPush(this.props.selectedUsers, this._field.state.value, this.props.userAuth).then((data) => {
            
            data.error ? (
                this.setState({ pushError: true, pushErrorMsg: data.message})
            ) : (
                this.clearPushMes()
            )
            onClose();
		}).catch((error) => {
            console.log(error);
            onClose();
		});
    }

    onChangeEmail = (e) => {
        this.setState({ emailTag: e.target.value });
    }

    onEmailConfirm = () => confirmAlert({
        customUI: ({ onClose }) => (
            <div class={"confirmModal"}>
                <p class={"confirmTitle"}>Do you want to send email notifications?</p>
                <button class={"confirmOkBtn"} onClick={this.emailConfirmSending(onClose)}>Yes</button>
                <button class={"confirmCancelBtn"} onClick={onClose}>No</button>
            </div>
        )
    });

    emailConfirmSending = (onClose) => async () => {
        this.setState({ emailError: false, emailErrorMsg: ''});
        sendEmail(this.props.selectedUsers, this.state.emailTag, this.props.userAuth).then((data) => {
            
            data.error ? (
                this.setState({ emailError: true, emailErrorMsg: data.message})
            ) : (
                this.setState({ emailTag: '' })
            );
            onClose();
		}).catch((error) => {
            console.log(error);
            onClose();
		});
    }
    

	render(){

        const { selectedUsers } = this.props;

		return (
			<Card>
				{ selectedUsers.length ? 
                    <div>
                        <p>Selected users: {selectedUsers.length}</p>
                        Create: 
                        <button onClick={this.selectPush} style={{margin: '0 15px 0 30px'}}>Push</button>
                        <button onClick={this.selectEmail}>E-mail</button>


                        { this.state.pushArea && (
                            <div class={style.pushCreator}>
                                <div class={style.creatorTitle}>Push notification</div>
                                {/*<Select label='Type of push notification:' name='pushType' value={''} data={[]} onChange={this.onSelecPushType} isArrayData/>*/}
                                <div style={{color: '#3d5273', marginLeft: '50%'}}>Preview:</div>
                                <div class={style.textArea}>
                                    <EmojiField placeholder='Type here'
                                        onChange={this.onPushMesChange}
                                        ref={(_field) => this._field = _field}/>   
                                    <div dangerouslySetInnerHTML={{__html: this.state.unified}}/>
                                </div>
                                <button class='saveBtn' onClick={this.onPushConfirm}>Send</button>
                                {this.state.pushError && 
                                    <div class="errorSamllMsg">Error in sending push! {this.state.pushErrorMsg}</div>}
                            </div>
                        )}

                        { this.state.emailArea && (
                            <div class={style.pushCreator}>
                                <div class={style.creatorTitle}>E-mail notification</div>
                                <Input label='Email tag (from Prismic):' value={this.state.emailTag} onChange={this.onChangeEmail}/>
                                <button class='saveBtn' onClick={this.onEmailConfirm}>Send</button>
                                {this.state.emailError && 
                                    <div class="errorSamllMsg">Error in sending email! {this.state.emailErrorMsg}</div>}
                            </div>
                        )}
                        
                        
                    </div> 
                    : <div>There are no selected users for sending e-mail or push notifications.</div>}
			</Card>
		)
	}
	
};

export default MessagesArea;
import { h, Component } from 'preact';
import Card from '../card'
import Select from '../select'
import EmojiField from 'emoji-picker-textfield';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import style from './style.css'

class MessagesArea extends Component{
	constructor(props){
		super(props);

        this.state = {
            unified: '',
        }
    }
    
    selectPush = () => this.setState({ pushArea: true, emailArea: false });
    selectEmail = () => this.setState({ pushArea: false, emailArea: true });

    onSelecPushType = (e) => {
        console.log('[onSelecPushType]');
    }
    onPushMesChange = (e, value) => {
        const unified = this._field.getImages(value);
        this.setState({ unified });
    }
    onSendPush = () => {
        console.log('[onSendPush]', this._field.state.value);
        this.setState({ unified: '' });
        this._field.state.value = '';
    }

    onConfirm = () => confirmAlert({
        customUI: ({ onClose }) => (
            <div class={"confirmModal"}>
                <p class={"confirmTitle"}>Do you want to send push notifications?</p>
                <button class={"confirmOkBtn"} onClick={this.confirmSending(onClose)}>Yes</button>
                <button class={"confirmCancelBtn"} onClick={onClose}>No</button>
            </div>
        )
    });

    confirmSending = (onClose) => async () => {
        this.onSendPush();
        onClose();
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
                                <Select label='Type of push notification:' name='pushType' value={''} data={[]} onChange={this.onSelecPushType} isArrayData/>
                                <div style={{color: '#3d5273', marginLeft: '50%'}}>Preview:</div>
                                <div class={style.textArea}>
                                    <EmojiField placeholder='Type here'
                                        onChange={this.onPushMesChange}
                                        ref={(_field) => this._field = _field}/>   
                                    <div dangerouslySetInnerHTML={{__html: this.state.unified}}/>
                                </div>
                                <button class='saveBtn' onClick={this.onConfirm}>Send</button>
                            </div>
                        )}
                        
                        
                    </div> 
                    : <div>There are no selected users for sending e-mail or push notifications.</div>}
			</Card>
		)
	}
	
};

export default MessagesArea;
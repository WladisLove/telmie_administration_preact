import { h, Component } from 'preact';
import Card from '../card'
import Select from '../select'
import Input from '../input'
import EmojiField from 'emoji-picker-textfield';
import { confirmAlert } from 'react-confirm-alert';
import { sendPush, sendEmail, getPushList, updatePush } from '../../store/api/notifications'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Spin } from 'antd'
import PushItem from './push-item'

import "react-tabs/style/react-tabs.css";
import 'react-confirm-alert/src/react-confirm-alert.css'
import style from './style.css'

class MessagesArea extends Component{
	constructor(props){
		super(props);

        this.state = {
            tabIndex: 0,
            pushList: [],
            selectedPush: null,
        }
    }

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

    onPushConfirm = (isUpdate = false) => () => confirmAlert({
        customUI: ({ onClose }) => (
            <div class={"confirmModal"}>
                <p class={"confirmTitle"}>Do you want to {`${isUpdate ? 'update' : 'send'}`} push notifications?</p>
                <button class={"confirmOkBtn"} 
                    onClick={isUpdate ? this.onUpdatePush(onClose) : this.pushConfirmSending(onClose)}>
                    Yes
                </button>
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
    
    onTabSelect = (index, prevIndex) => {
        // 0 - Send email; 1 - Send custom push; 2 - Edit push
        (prevIndex === 1) && this.clearPushMes();
        (prevIndex === 2) && this.clearSelectedPush();
        (index === 2 && !this.state.pushList.length) && this.getPushList();
		this.setState({ tabIndex: index });
    }
    
    getPushList = () => {
        this.setState({ loadingPushList: true, pushList: [], pushListErr: false });
        getPushList(this.props.userAuth).then((data) => {
            data.error ? (
                this.setState({ loadingPushList: false, pushListErr: true })
            ) : (
                this.setState({ loadingPushList: false, pushList: [...data] })
            );
		}).catch((error) => {
            console.log(error);
            this.setState({ loadingPushList: false });
		});
    }

    setPushItem = (item) => {
        this.setState({ selectedPush: {...item}});
        this._pushTitleField && ( this._pushTitleField.state.value = item.title );
        this._pushBodyField && ( this._pushBodyField.state.value = item.body );
    }
    clearSelectedPush = (onlyFields = false) => {
        onlyFields ? 
            this.setState({ selectedPush: null }) : this.setState({ selectedPush: null, pushList: [] });
        this._pushTitleField && ( this._pushTitleField.state.value = '' );
        this._pushBodyField && ( this._pushBodyField.state.value = '' );
    }
    onPushEdit = (name) => (e, value) => {
        name === "pushTitle" && ( this._pushTitleField.state.value = this._pushTitleField.getUnicode(value) );
        name === "pushBody" && ( this._pushBodyField.state.value = this._pushBodyField.getUnicode(value) );
    }

    onUpdatePush = (onClose) => async () => {
        this.setState({ pushUpdateErr: false, });
        const data = {
            ...this.state.selectedPush,
            title: this._pushTitleField.state.value,
            body: this._pushBodyField.state.value,
        };

        const replaceItem = () => {
            const { pushList=[], selectedPush} = this.state;
            const index = pushList.findIndex(elem => (elem.id === selectedPush.id));
            const newArr = [...pushList];
            newArr.splice(index, 1, data);
            return newArr;
        }
        
        updatePush(data, this.props.userAuth).then((data) => {            
            data.error ? (
                this.setState({ pushUpdateErr: true })
            ) : (
                this.setState(prev => ({ pushList: replaceItem(prev)})),
                this.clearSelectedPush(true)                
            );
            onClose();
		}).catch((error) => {
            console.log(error);
            this.setState({ pushUpdateErr: true });
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

                        <Tabs selectedIndex={this.state.tabIndex}
		    		        onSelect={this.onTabSelect}>
                            <TabList>
                                <Tab>Send email</Tab>
                                <Tab>Send custom push</Tab>
                                <Tab>Edit push</Tab>
                            </TabList>

                            <TabPanel className={style.pushCreator}>
                                    <div class={style.creatorTitle}>E-mail notification</div>
                                    <Input label='Email tag (from Prismic):' value={this.state.emailTag} onChange={this.onChangeEmail}/>
                                    <button class='saveBtn' onClick={this.onEmailConfirm}>Send</button>
                                    {this.state.emailError && 
                                        <div class="errorSamllMsg">Error in sending email! {this.state.emailErrorMsg}</div>}
                            </TabPanel>
                            <TabPanel className={style.pushCreator}>
                                <div class={style.creatorTitle}>Push notification</div>
                                {/*<Select label='Type of push notification:' name='pushType' value={''} data={[]} onChange={this.onSelecPushType} isArrayData/>*/}
                                <div style={{color: '#3d5273', marginLeft: '50%'}}>Preview:</div>
                                <div class={style.textArea}>
                                    <EmojiField placeholder='Type here'
                                        onChange={this.onPushMesChange}
                                        ref={(_field) => this._field = _field}/>   
                                    <div dangerouslySetInnerHTML={{__html: this.state.unified}}/>
                                </div>
                                <button class='saveBtn' onClick={this.onPushConfirm()}>Send</button>
                                {this.state.pushError && 
                                    <div class="errorSamllMsg">Error in sending push! {this.state.pushErrorMsg}</div>}
                            </TabPanel>
                            <TabPanel>
                                {this.state.loadingPushList ? 
                                    <div style={{textAlign: "center"}}><Spin size='large'/></div>
                                    :
                                    <div class={style.editPushTab}>
                                        <div class={style.pushEditArea}>
                                            <EmojiField placeholder='Title'
                                                onChange={this.onPushEdit("pushTitle")}
                                                fieldType="input"
                                                disabled={!this.state.selectedPush}
                                                ref={(_field) => this._pushTitleField = _field}/>
                                            <EmojiField placeholder='Body'
                                                onChange={this.onPushEdit("pushBody")}
                                                disabled={!this.state.selectedPush}
                                                ref={(_field) => this._pushBodyField = _field}/>
                                            <button class='saveBtn' disabled={!this.state.selectedPush} onClick={this.onPushConfirm(true)}>Send</button>
                                            {
                                                this.state.pushListErr && <div class='errorSamllMsg'>Error in getting push list.</div>
                                            }
                                            {
                                                this.state.pushUpdateErr && <div class='errorSamllMsg'>Error in updating push notification.</div>
                                            }
                                        </div>
                                        
                                        <div class={style.pushList}>
                                            {this.state.pushList.map(el => <PushItem item={el} setItem={this.setPushItem} key={el.key}/>)}
                                        </div>
                                    </div>
                                }
                            </TabPanel>
                        </Tabs>
                        
                        
                    </div> 
                    : <div>There are no selected users for sending e-mail or push notifications.</div>}
			</Card>
		)
	}
	
};

export default MessagesArea;
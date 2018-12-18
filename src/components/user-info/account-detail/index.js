import { h, Component } from 'preact';
import style from './style.css';
import Input from '../../input'
import ImageUploader from 'react-images-upload';

import { apiRoot } from '../../../store/api/index'

class AccountDetail extends Component {
    constructor(props){
        super(props);

        const {user = {}} = props;
        const {name, lastName, email} = user;

        this.state = {
            userInfo: {
                name, 
                lastName, 
                email,
            },
            isEdited: false,
        }
    }

    onDrop = () => {
    
    }

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState(prev => ({
            userInfo: {
                ...prev.userInfo,
                [name]: value,
            },
            isEdited: true,
        }))
    }

    onCancel = () => {
        const { user = {} } = this.props;
        this.setState({
            userInfo: { ...user },
            isEdited: false,
        });
    }

    onSave = () => {
        this.props.saveUserInfo(this.state.userInfo);
    }

    render(){
        const { user = {}, isPending, changedFields } = this.props;
        const { avatar } = user;
        const { isEdited, userInfo = {}} = this.state;
        const {name, lastName, email} = userInfo;
    
        return (
            <div class={style.accountDetail}>
                <div style={{width: '100%'}}>
                    <div class='headline'>Account details</div>
                    <div class='doubleInput'>
                        <Input label='First Name:' name='name' value={name} onChange={this.onChange} disabled={isPending} changedFields={changedFields}/>
                        <Input label='Last Name:' name='lastName' value={lastName} onChange={this.onChange} disabled={isPending} changedFields={changedFields}/>
                    </div>
                    <Input label='Email:' name='email' value={email} disabled={true} changedFields={changedFields}/>
    
                    <div class={style.controls}>
                        {
                            isEdited && [
                                <button class='cancelBtn' onClick={this.onCancel}>Cancel</button>,
                                <button class='saveBtn' onClick={this.onSave}>Save</button>
                            ]
                        }
                    </div>
                </div>
                
                <div class={style.imageContainer}>
    
                    <div className={style.image}>
                        {(user.avatar != null) ? (
                            <img src={apiRoot + 'image/' + user.avatar.id} alt={user.name + ' ' + user.lastName} />
                        ) : (
                            <img src="/assets/nouserimage.jpg" alt={''} />
                        )}
                    </div>
    
                    {/*<ImageUploader
                        withIcon={false}
                        buttonText='Upload new'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.png', '.gif']}
                    maxFileSize={5242880} />*/}
                </div>
                
            </div>
        )
    }
    
}

export default AccountDetail;
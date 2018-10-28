import { h, Component } from 'preact';
import style from './style.css';
import Input from '../../input'
import ImageUploader from 'react-images-upload';

const AccountDetail = props =>  {
    const { user = {} } = props;
    const {name, lastName, email, avatar} = user;

    const onDrop = () => {

    }
    
    return (
        <div class={style.accountDetail}>
            <div style={{width: '100%'}}>
                <div class='headline'>Account details</div>
                <div class='doubleInput'>
                    <Input label='First Name:' name='name' value={name}/>
                    <Input label='Last Name:' name='lastName' value={lastName}/>
                </div>
                <Input label='Email:' name='email' value={email}/>
            </div>
            
            <div class={style.imageContainer}>

                <div className={style.image}>
					{/* (userData.avatar != null) ? (
						<img src={apiRoot + 'image/' + userData.avatar.id} alt={userData.name + ' ' + userData.lastName} />
					) : (
						<img src="/assets/nouserimage.jpg" alt={''} />
					)*/}
				</div>

                <ImageUploader
					withIcon={false}
					buttonText='Upload new'
					onChange={onDrop}
					imgExtension={['.jpg', '.png', '.gif']}
					maxFileSize={5242880} />
            </div>
            
        </div>
    )
}

export default AccountDetail;
import { h, Component } from 'preact';
import Delimeter from './delimeter'
import AccountControlsArea from './acc-controls-area'
import AccountDetail from './account-detail'
import ProDetails from './pro-detail/'
import AdminNotes from './admin-notes'
import { Icon, Spin } from 'antd'
import style from './style.css';

const cloneUser = (user = {}) => {
    return user.pro ? {
        ...user,
        pro: { ...user.pro }
    } : {
        ...user
    }
} 

const checkPro = (user, changedInfo) => {
    if (!changedInfo) return;
    console.log('[checkPro]');
    let changedFields = {};
    let d, new_d;
    for (let key in changedInfo){
        
        user.pro.hasOwnProperty(key) ? (
            user.pro[key] !== changedInfo[key] && (
                changedFields[key] = user.pro[key],
                user.pro[key] = changedInfo[key]
            )
        ) : user.hasOwnProperty(key) 
            && (
                key === 'dateOfBirth' ? (
                    d = new Date(user[key]),
                    new_d = new Date(changedInfo[key]),
                    d.getDate() !== new_d.getDate() 
                        && d.getFullYear() !== new_d.getFullYear() 
                        && d.getMonth() !== new_d.getMonth() 
                            && (
                                changedFields[key] = user[key],
                                user[key] = changedInfo[key]
                            )
                ) : (
                    user[key] !== changedInfo[key] && (
                        changedFields[key] = user[key],
                        user[key] = changedInfo[key]
                    )
                )
            )
        
    }
    return changedFields;
}
const checkNotPro = (user, changedInfo) => {
    if (!changedInfo) return;
    console.log('[checkNotPro]');
    let changedFields = {};
    user.pro = {};
    for (let key in changedInfo){
        
        user.hasOwnProperty(key) ? (
            user[key] !== changedInfo[key] && (
                changedFields[key] = user[key],
                user[key] = changedInfo[key]
            )
        ) : (
            changedFields[key] = "",
            user.pro[key] = changedInfo[key]
        );
        
    }

    return changedFields;
}
const checkForLocation = (user, changedFields) => {
    const {location = null} = user;

    if (changedFields.hasOwnProperty('location')){
        let prevLocation = JSON.parse(location) ? JSON.parse(location) : {};
        for (let key in prevLocation){
            changedFields.location 
                ? (changedFields.location[key] !== prevLocation[key] && (changedFields[key] = prevLocation[key]) )
                : ( changedFields[key] = "" )
        }
    }
}

const UserInfo = props =>  {
    const {
        backToList, serverData = {}, isPending = false, isIndividual, isForDelete, activateUser, 
        pendingControlsFunc, accControlsFunc, editUserFunc, 
    } = props;
    const {error: isError, message : errorMessage = '', isModifying} = props.selectedUser ? props.selectedUser : {};

    const {categories = [],subCategories=[]} = serverData;

    const saveUserInfo = (fields = {}) => {
        let data = {
            ...user,
            ...fields,
        }
        editUserFunc(data)
    }

    let user = null, changedInfo = null;
    isPending ? (
        changedInfo = { ...props.user },
        user = cloneUser(changedInfo.owner),
        delete changedInfo.owner,
        delete changedInfo.id
    ) : (
        {selectedUser : user = null} = props.selectedUser
    )

    let changedFields = (user && user.pro) ? checkPro(user, changedInfo) : checkNotPro(user, changedInfo);
    changedInfo && checkForLocation(user, changedFields);


    return (
        <div class={``}>
            <div class={style.profileHeader}>
                {
                    user ? <h1 style={{margin: 0}}>{user.name} {user.lastName}</h1> : <h1 style={{margin: 0}}>Loading...</h1>
                }
                <div class={style.backBtn} onClick={backToList}> <Icon type="arrow-left" theme="outlined" /> Back to list</div>
            </div>
            <Delimeter statusText={user ? user.status : ''}/>

            {
                isError ? (
                    <div class="errorContainer">
						Error! {errorMessage}
					</div>
                ) : (
                    !isModifying && user ? ([
                        !isPending && <AccountControlsArea selectedUser = {props.selectedUser}
                            isForDelete={isForDelete}
                            accControlsFunc={accControlsFunc} />,

                        <AccountDetail isPending = {isPending} user={user} saveUserInfo={saveUserInfo} changedFields={changedFields}/>,
                        <ProDetails categories={categories} 
                                    subCategories={subCategories} 
                                    isPending={isPending} 
                                    user={user} 
                                    controlsFunc={pendingControlsFunc} 
                                    activateUser={activateUser}
                                    changedFields={changedFields}/>,
                        <AdminNotes saveNote={(note) => console.log('save note:', note)}/>,
                    ]) : (
                        <div class="spinContainer"><Spin size='large'/></div>
                    )
                )
            }
            
        </div>
    )
}

export default UserInfo;
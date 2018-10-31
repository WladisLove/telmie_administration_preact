import { h, Component } from 'preact';
import Delimeter from './delimeter'
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
    for (let key in changedInfo){
        
        user.pro.hasOwnProperty(key) ? (
            user.pro[key] !== changedInfo[key] && (
                changedFields[key] = user.pro[key],
                user.pro[key] = changedInfo[key]
            )
        ) : user.hasOwnProperty(key) 
            && (
                user[key] !== changedInfo[key] && (
                    changedFields[key] = user[key],
                    user[key] = changedInfo[key]
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
    const {backToList, serverData = {}, isPending = false, isIndividual, activateUser, controlsFunc, isError, editUserFunc, errorMessage ='' } = props;
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
        {user} = props
    )

    console.log(props.user)
    let changedFields = user.pro ? checkPro(user, changedInfo) : checkNotPro(user, changedInfo);
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
                    user ? ([
                        !isPending && <div class={style.topBtnsArea}>
                            <button disabled={true} >Activities</button>
                            <button disabled={true} >Money</button>
                            <button disabled={true} >Clients</button>
                            <button disabled={true} >List of Pros</button>
                            <button disabled={true} >Change Status</button>
                        </div>,

                        <AccountDetail isPending = {isPending} user={user} saveUserInfo={saveUserInfo} changedFields={changedFields}/>,
                        <ProDetails categories={categories} 
                                    subCategories={subCategories} 
                                    isPending={isPending} 
                                    user={user} 
                                    controlsFunc={controlsFunc} 
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
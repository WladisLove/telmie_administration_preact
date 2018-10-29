import { h, Component } from 'preact';
import Delimeter from './delimeter'
import AccountDetail from './account-detail'
import IndividualProDetail from './pro-detail/individual'
import BusinessProDetail from './pro-detail/business'
import AdminNotes from './admin-notes'
import { Icon, Spin } from 'antd'
import style from './style.css';

const currencyArr = [{
    name: '£',
    value: '£'
}];

const timeArr = [{
    name: 'min',
    value: 'min',
}];

const UserInfo = props =>  {
    const {user = {}, backToList, serverData = {}, isPending, isIndividual, activateUser, controlsFunc, isError, editUserFunc, errorMessage ='' } = props;
    const {categories = [],subCategories=[]} = serverData;

    const saveUserInfo = (fields = {}) => {
        let data = {
            ...user,
            ...fields,
        }
        editUserFunc(data)
    }

    console.log(user)

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
                        <div class={style.topBtnsArea}>
                            <button disabled={true} >Activities</button>
                            <button disabled={true} >Money</button>
                            <button disabled={true} >Clients</button>
                            <button disabled={true} >List of Pros</button>
                            <button disabled={true} >Change Status</button>
                        </div>,

                        <AccountDetail isPending = {isPending} user={user} saveUserInfo={saveUserInfo}/>,
                        /*(isIndividual ? 
                            <IndividualProDetail categories={categories} subCategories={subCategories} isPending={isPending} user={user} activateUser={activateUser}/>
                            :*/( <BusinessProDetail categories={categories} 
                                    subCategories={subCategories} 
                                    isPending={isPending} 
                                    user={user} 
                                    controlsFunc={controlsFunc} 
                                    activateUser={activateUser}/>),
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
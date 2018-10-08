import { h, Component } from 'preact';
import Delimeter from './delimeter'
import AccountDetail from './account-detail'
import IndividualProDetail from './individual-pro-detail'
import AdminNotes from './admin-notes'
import { Icon } from 'antd'
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
    const {user, backToList, serverData } = props;
    const {categories = [],subCategories=[]} = serverData;

    return (
        <div class={``}>
            <div class={style.profileHeader}>
                <h1 style={{margin: 0}}>{user.firstName} {user.lastName}</h1>
                <div class={style.backBtn} onClick={backToList}> <Icon type="arrow-left" theme="outlined" /> Back to list</div>
            </div>
            <Delimeter statusText={user.status}/>

            <div class={style.topBtnsArea}>
                <button disabled={true} class={style.topBtn}>Activities</button>
                <button disabled={true} class={style.topBtn}>Money</button>
                <button disabled={true} class={style.topBtn}>Clients</button>
                <button disabled={true} class={style.topBtn}>List of Pros</button>
                <button disabled={true} class={style.topBtn}>Change Status</button>
            </div>

            <AccountDetail/>
            <IndividualProDetail categories={categories} subCategories={subCategories}/>
            <AdminNotes saveNote={(note) => console.log('save note:', note)}/>
        </div>
    )
}

export default UserInfo;
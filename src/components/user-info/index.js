import { h, Component } from 'preact';
import Delimeter from './delimeter'
import AccountDetail from './account-detail'
import IndividualProDetail from './individual-pro-detail'
import { Icon } from 'antd'
import style from './style.css';

const UserInfo = props =>  {
    const {user, backToList } = props;
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
            <IndividualProDetail/>
        </div>
    )
}

export default UserInfo;
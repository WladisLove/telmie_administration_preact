import { h } from 'preact';
import { Spin } from 'antd'

import style from './style.css';

const AccountControlsArea = ({selectedUser, accControlsFunc}) => {

    const {selectedUser : user = null, errorChangeStatus = false, msgChangeStatus} = selectedUser;

    const changeStatus = () => accControlsFunc.changeStatus(user.id);

    return (
        <div>
            <div class={style.topBtnsArea}>
                <button disabled={true} >Activities</button>
                <button disabled={true} >Money</button>
                <button disabled={true} >Clients</button>
                <button disabled={true} >List of Pros</button>
                <button disabled={!user} onClick={changeStatus}>Change Status 
                    {user && [<br/>, <span class={style.smallText}>(to {user.enabled ? 'disabled' : 'enabled'})</span>]}
                </button>
            </div>
            { errorChangeStatus && <div style={{color: 'red', textAlign: 'center'}}>{msgChangeStatus}</div>}
        </div>
)};

export default AccountControlsArea;

import { h } from 'preact';
import { Spin } from 'antd'

import style from './style.css';

const AccountControlsArea = ({selectedUser, isForDelete = false, accControlsFunc}) => {

    const {selectedUser : user = null, modifyErr = false, modifyMsg} = selectedUser;

    const changeStatus = () => accControlsFunc.changeStatus(user.id),
        getActivities = () => accControlsFunc.getActivities(user.id),
        getProsList = () => accControlsFunc.getProsList(user.id);

    const restore = () => accControlsFunc.restore(user.id);

    return (
        <div>
            {isForDelete && <div class={`${style.topBtnsArea} ${style.wideBtnsArea}`}>
                <button disabled={true}>Permanently delete user</button>
                <button onClick={restore} >Restore user</button>
            </div>}
            <div class={style.topBtnsArea}>
                <button disabled={!user} onClick={getActivities}>Activities</button>
                <button disabled={true} >Money</button>
                <button disabled={true} >Clients</button>
                <button disabled={!user} onClick={getProsList}>List of Pros</button>
                {
                    !isForDelete && <button disabled={!user} onClick={changeStatus}>Change Status 
                        {user && [<br/>, <span class={style.smallText}>(to {user.enabled ? 'disabled' : 'enabled'})</span>]}
                    </button>
                }
            </div>
            { modifyErr ? 
                <div style={{color: 'red', textAlign: 'center'}}>{modifyMsg}</div> : (
                    modifyMsg && <div style={{color: 'green', textAlign: 'center'}}>{modifyMsg}</div>
                )}

        </div>
)};

export default AccountControlsArea;

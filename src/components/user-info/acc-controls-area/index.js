import { h, Component } from 'preact';
import { INFO_TYPES } from '../../../helpers/consts'

import style from './style.css';

const AccountControlsArea = props => {

    const {selectedUser, isForDelete = false, activeTab, accControlsFunc} = props;
    const {selectedUser : user = null, modifyErr = false, modifyMsg} = selectedUser;

    const accDetails = () => props.changeTab(INFO_TYPES.ACC_DETAILS);
    const changeStatus = () => accControlsFunc.changeStatus(user.id);
    const getActivities = () => {
        props.changeTab(INFO_TYPES.ACTIVITIES);
        accControlsFunc.getActivities(user.id);
    }
    const getClients = () => {
        props.changeTab(INFO_TYPES.CLIENTS);
        accControlsFunc.getClients(user.id);
    }
    const getProsList = () => {
        props.changeTab(INFO_TYPES.LIST_OF_PROS);
        accControlsFunc.getProsList(user.id);
    }
    const restore = () => accControlsFunc.restore(user.id);

    return (
        <div>
            {isForDelete && <div class={`${style.topBtnsArea} ${style.wideBtnsArea}`}>
                <button disabled={true}>Permanently delete user</button>
                <button onClick={restore} >Restore user</button>
            </div>}
            <div class={style.topBtnsArea}>
                <button disabled={!user} 
                    onClick={accDetails} 
                    class={activeTab === INFO_TYPES.ACC_DETAILS && style.selectedBtn}>Account details</button>
                <button disabled={!user} 
                    onClick={getActivities}
                    class={activeTab === INFO_TYPES.ACTIVITIES && style.selectedBtn}>Activities</button>
                <button disabled={true} 
                    class={activeTab === INFO_TYPES.MONEY && style.selectedBtn}>Money</button>
                <button disabled={!user} 
                    onClick={getClients}
                    class={activeTab === INFO_TYPES.CLIENTS && style.selectedBtn}>Clients</button>
                <button disabled={!user} 
                    onClick={getProsList}
                    class={activeTab === INFO_TYPES.LIST_OF_PROS && style.selectedBtn}>List of Pros</button>
                { !isForDelete && <button disabled={!user} onClick={changeStatus}> 
                       {(user && user.enabled) ? 'Disable' : 'Enable'} User  
                    </button> }
            </div>
            { modifyErr ? 
                <div style={{color: 'red', textAlign: 'center'}}>{modifyMsg}</div> : (
                    modifyMsg && <div style={{color: 'green', textAlign: 'center'}}>{modifyMsg}</div>
                )}
        </div>
    )
    
}

export default AccountControlsArea;

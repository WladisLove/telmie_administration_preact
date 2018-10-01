import { h, Component } from 'preact';
import Delimeter from './delimeter'
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

            <div class={style.topBtns}>
                <button>Activities</button>
                <button>Money</button>
                <button>Clients</button>
                <button>List of Pros</button>
                <button>Change Status</button>
            </div>
        </div>
    )
}

export default UserInfo;
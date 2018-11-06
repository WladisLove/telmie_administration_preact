import { h, Component } from 'preact';
import { Table } from 'antd'
import { infoColumns } from '../../../helpers/table-data'
import { PAGE_SIZE } from '../../../helpers/consts'

import style from './style.css';

class AccountControlsArea extends Component{

    changeStatus = (id) => () => this.props.accControlsFunc.changeStatus(id);

    getActivities = (id) => () => this.props.accControlsFunc.getActivities(id);

    getProsList = (id) => () => this.props.accControlsFunc.getProsList(id);

    restore = (id) => () => this.props.accControlsFunc.restore(id);

    render(){
        const {selectedUser, isForDelete = false} = this.props;
        const {selectedUser : user = null, modifyErr = false, modifyMsg} = selectedUser;


        return (
            <div>
                {isForDelete && <div class={`${style.topBtnsArea} ${style.wideBtnsArea}`}>
                    <button disabled={true}>Permanently delete user</button>
                    <button onClick={this.restore(user.id)} >Restore user</button>
                </div>}
                <div class={style.topBtnsArea}>
                    <button disabled={!user} onClick={this.getActivities(user.id)}>Activities</button>
                    <button disabled={true} >Money</button>
                    <button disabled={true} >Clients</button>
                    <button disabled={!user} onClick={this.getProsList(user.id)}>List of Pros</button>
                    {
                        !isForDelete && <button disabled={!user} onClick={this.changeStatus(user.id)}>Change Status 
                            {user && [<br/>, <span class={style.smallText}>(to {user.enabled ? 'disabled' : 'enabled'})</span>]}
                        </button>
                    }
                </div>
                { modifyErr ? 
                    <div style={{color: 'red', textAlign: 'center'}}>{modifyMsg}</div> : (
                        modifyMsg && <div style={{color: 'green', textAlign: 'center'}}>{modifyMsg}</div>
                    )}
                {selectedUser.infoType && <div class={style.infoListArea}>
                    {selectedUser.infoType}:
                    <Table columns={infoColumns(selectedUser.infoType)}
                        rowKey={(record) => record.id}
                        pagination={{pageSize: PAGE_SIZE}}
                        dataSource={selectedUser.infoList}/>
                </div>}
            </div>
        )
    }
}

export default AccountControlsArea;

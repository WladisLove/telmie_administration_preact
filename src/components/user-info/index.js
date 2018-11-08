import { h, Component } from 'preact';
import Delimeter from './delimeter'
import AccountControlsArea from './acc-controls-area'
import AccountDetail from './account-detail'
import ProDetails from './pro-detail/'
import AdminNotes from './admin-notes'
import { Icon, Spin, Table } from 'antd'
import style from './style.css';

import { cloneUser, checkPro, checkNotPro, checkForLocation} from '../../helpers/user'
import { infoColumns } from '../../helpers/table-data'
import { PAGE_SIZE, INFO_TYPES } from '../../helpers/consts'

class UserInfo extends Component{
    constructor(props){
        super(props);

        this.state = {
            activeTab: INFO_TYPES.ACC_DETAILS,
        }
    }

    changeTab = (activeTab) => this.setState({ activeTab });

    saveUserInfo = (fields = {}) => {
        let data = {
            ...user,
            ...fields,
        };
        this.props.editUserFunc(data);
    }

    renderContent = (user, changedFields) => {
        switch (this.state.activeTab){
            case INFO_TYPES.ACTIVITIES:
            case INFO_TYPES.CLIENTS:
            case INFO_TYPES.LIST_OF_PROS: {

                return (
                    <div class={style.infoListArea}>
                        <Table columns={infoColumns(this.props.selectedUser.infoType)}
                            rowKey={(record) => record.id}
                            pagination={{pageSize: PAGE_SIZE}}
                            dataSource={this.props.selectedUser.infoList}/>
                    </div>
                )
            }
            case INFO_TYPES.ACC_DETAILS: 
            default: {
                const {categories = [],subCategories=[]} = this.props.serverData;
                
                return [
                    <AccountDetail isPending = {this.props.isPending} 
                        user={user}
                        saveUserInfo={this.saveUserInfo}
                        changedFields={changedFields}/>,
                    (user && user.pro) && <ProDetails categories={categories} 
                                subCategories={subCategories} 
                                isPending={this.props.isPending} 
                                user={user} 
                                controlsFunc={this.props.pendingControlsFunc} 
                                activateUser={this.props.activateUser}
                                changedFields={changedFields}/>,
                    <AdminNotes saveNote={(note) => console.log('save note:', note)}/>,
                ]
            }
                
        }
    }

    render(){
        const { activeTab } = this.state;
        const { backToList, isPending = false, isForDelete, accControlsFunc, } = this.props;
        const {error: isError, message : errorMessage = '', isModifying} = this.props.selectedUser ? this.props.selectedUser : {};
    
        let user = null, changedInfo = null;
        isPending ? (
            changedInfo = { ...this.props.user },
            user = cloneUser(changedInfo.owner),
            delete changedInfo.owner,
            delete changedInfo.id
        ) : (
            {selectedUser : user = null} = this.props.selectedUser
        )
    
        let changedFields = (user && user.pro) ? checkPro(user, changedInfo) : checkNotPro(user, changedInfo);
        changedInfo && checkForLocation(user, changedFields);

        return (
            <div class={``}>
                <div class={style.profileHeader}>
                    { user ? <h1 style={{margin: 0}}>{user.name} {user.lastName}</h1> : <h1 style={{margin: 0}}>Loading...</h1> }
                    <div class={style.backBtn} onClick={backToList}> <Icon type="arrow-left" theme="outlined" />Back to list</div>
                </div>
                <Delimeter statusText={user ? user.status : ''}/>
    
                {!isPending && <AccountControlsArea 
                                selectedUser = {this.props.selectedUser}
                                activeTab={activeTab}
                                changeTab={this.changeTab}
                                isForDelete={isForDelete}
                                accControlsFunc={accControlsFunc} />}

                {
                    isError ? (
                        <div class="errorContainer">
                            Error! {errorMessage}
                        </div>
                    ) : (
                        !isModifying && user ? (
                            this.renderContent(user, changedFields)
                        ) : (
                            <div class="spinContainer"><Spin size='large'/></div>
                        )
                    )
                }
            </div>
        )
    }
}

export default UserInfo;
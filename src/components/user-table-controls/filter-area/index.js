import { h, Component } from 'preact';

import { Checkbox } from 'antd';
import style from './style.css';

const statusArr = [{
	name: 'Registered',
	value: 'REGISTERED',
}, {
	name: 'Suspended',
	value: 'SUSPENDED',
}, {
	name: 'Started Pro Appl',
	value: 'STARTED_PRO_APP',
}, {
	name: 'Pending Approval',
	value: 'PENDING_APPROVAL',
}, {
	name: 'Approved as Pro',
	value: 'APPROVED_AS_PRO',
}, {
	name: 'Suspended as Pro',
	value: 'SUSPENDED_AS_PRO',
}];

const statusInvites = [{
	name: 'Pending',
	value: 'PENDING',
}, {
	name: 'Registered as User',
	value: 'REGISTERED_AS_USER',
}, {
	name: 'Accepted',
	value: 'ACCEPTED',
}, {
	name: 'Get bonus',
	value: 'GET_BONUS',
}];

const getDefaultStatuses = (isInv) => isInv ? statusInvites.map(el => el.value) : statusArr.map(el => el.value);

class FilterArea extends Component {
    constructor(props){
		super(props);

		this.state = {
			statusFilter: getDefaultStatuses(props.isInvites) || [],
		}
    }
    
    onChange = (checkedValues) => this.setState({statusFilter: [...checkedValues]});
    
    onFilter = () => this.props.isInvites ? 
        this.props.onFilter(this.state.statusFilter, statusInvites.length)
        : this.props.onFilter(this.state.statusFilter, statusArr.length);

    render(){
        const {statusFilter} = this.state;
        const {usersByStatus}= this.props;

        return this.props.isShown ? 
            null : ( 
                <div class={style.filterGroup}>
                    <div class={style.filterGroupLabel}> Status filter: </div>
                    
                    <Checkbox.Group onChange={this.onChange} value={statusFilter}	>
                        {this.props.isInvites ? (
                            statusInvites.map(({name, value}) => (<Checkbox key={name} value={value} 
                                class={statusFilter.indexOf(value) != -1 && style.checked}>{name}</Checkbox>))
                        ) : (
                            statusArr.map(({name, value}) => (<Checkbox key={name} value={value} 
                                class={statusFilter.indexOf(value) != -1 && style.checked}>
                                {name} ({ usersByStatus[value] || 0 })
                            </Checkbox>))
                        )}
                    </Checkbox.Group>
                    
                    <button onClick={this.onFilter} class={`${style.filterBtn} saveBtn`}>Filter</button>
                </div>
        )
    }
    
};

export default FilterArea;
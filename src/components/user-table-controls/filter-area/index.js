import { h, Component } from 'preact';

import { Table, Checkbox, Spin } from 'antd';
import style from './style.css';

const statusArr = [{
	name: 'Registered',
	value: 'REGISTERED',
}, {
	name: 'Suspended',
	value: 'SUSPENDED',
}, /*{
	name: 'Started Pro Appl',
	value: 'REGISTERED',
}, {
	name: 'Pending Approval',
	value: 'REGISTERED',
},*/ {
	name: 'Approved as Pro',
	value: 'APPROVED_AS_PRO',
}, {
	name: 'Suspended as Pro',
	value: 'SUSPENDED_AS_PRO',
}];

const getDefaultStatuses = () => statusArr.map(el => el.value);

class FilterArea extends Component {
    constructor(props){
		super(props);

		this.state = {
			statusFilter: getDefaultStatuses() || [],
		}
    }
    
    onChange = (checkedValues) => this.setState({statusFilter: [...checkedValues]});
    
    onFilter = () => this.props.onFilter(this.state.statusFilter, statusArr.length);

    render(){
        const {statusFilter} = this.state;

        return this.props.isShown ? 
            null : ( 
                <div class={style.filterGroup}>
                    <div class={style.filterGroupLabel}> Status filter: </div>
                    
                    <Checkbox.Group onChange={this.onChange} value={statusFilter}	>
                        {statusArr.map(({name, value}) => (<Checkbox className={statusFilter.indexOf(value) != -1 && style.checked} 
                                                                        key={name} value={value}>{name}</Checkbox>))}
                    </Checkbox.Group>
                    
                    <button onClick={this.onFilter} class={`${style.filterBtn} saveBtn`}>Filter</button>
                </div>
        )
    }
    
};

export default FilterArea;
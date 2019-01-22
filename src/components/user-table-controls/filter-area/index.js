import { h, Component } from 'preact';

import { Checkbox } from 'antd';
import style from './style.css';

const getDefaultStatuses = (props) => props.statuses.map(el => el.value);

class FilterArea extends Component {
    constructor(props){
		super(props);

		this.state = {
			statusFilter: getDefaultStatuses(props) || [],
		}
    }
    
    onChange = (checkedValues) => this.setState({statusFilter: [...checkedValues]});
    
    onFilter = () => this.props.onFilter(this.state.statusFilter, this.props.statuses.length);

    render(){
        const {statusFilter} = this.state;
        const {usersByStatus, statuses}= this.props;

        return this.props.isShown ? 
            null : ( 
                <div class={style.filterGroup}>
                    <div class={style.filterGroupLabel}> Status filter: </div>
                    
                    <Checkbox.Group onChange={this.onChange} value={statusFilter}	>
                        {this.props.isInvites ? (
                            statuses.map(({name, value}) => (<Checkbox key={name} value={value} 
                                class={statusFilter.indexOf(value) != -1 && style.checked}>{name}</Checkbox>))
                        ) : (
                            statuses.map(({name, value}) => (<Checkbox key={name} value={value} 
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
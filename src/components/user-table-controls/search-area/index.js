import { h, Component } from 'preact';

import { Table, Checkbox, Spin } from 'antd';
//import style from './style.css';


class SearchArea extends Component {
    constructor(props){
		super(props);

		/*this.state = {
			statusFilter: getDefaultStatuses() || [],
		}*/
    }
    
    /*onChange = (checkedValues) => this.setState({statusFilter: [...checkedValues]});
    
    onFilter = () => this.props.onFilter(this.state.statusFilter, statusArr.length);*/

    render(){
        const {statusFilter} = this.state;

        return (
            <div class={style.searchGroup}>
                <div class={style.searchGroupLabel}> Search by fields: </div>
                
                
                <button /*onClick={this.onFilter}*/ class={`${style.searchBtn} saveBtn`}>Search</button>
            </div>
        )
    }
    
};

export default SearchArea;
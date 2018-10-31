import { h, Component } from 'preact';

import SearchItem from './search-item'
import style from './style.css';


class SearchArea extends Component {
    constructor(props){
		super(props);

        this.state = {
            general: '',
            mobile: '',
            dateOfBirth: '',
        }
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name] : value});
    };
    
    onSearch = () => {
        let notEmptyFields = {};
        for (let key in this.state){
            notEmptyFields[key] = this.state[key].toLowerCase()
        }
        this.props.onSearch(notEmptyFields);
    }

    render(){
        const {general, mobile, dateOfBirth} = this.state;

        return this.props.isShown ? 
            null : (
                <div class={style.searchGroup}>
                    <div class={style.searchGroupLabel}> Search by fields: </div>
                    
                    <div class={style.searchItems}>
                        <SearchItem label='General:' name='general' value={general} onChange={this.onChange}/>
                        <SearchItem label='Mobile:' name='mobile' value={mobile} onChange={this.onChange}/>
                        <SearchItem label='Date of birth:' name='dateOfBirth' value={dateOfBirth} isDate={true} onChange={this.onChange}/>
                    </div>
                    
                    <button onClick={this.onSearch} class={`${style.searchBtn} saveBtn`}>Search</button>
                </div>
            )
    }
    
};

export default SearchArea;
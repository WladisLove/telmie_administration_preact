import { h, Component } from 'preact';

import SearchItem from './search-item'
import style from './style.css';


class SearchArea extends Component {
    constructor(props){
		super(props);

        this.state = {
            name: '',
            lastName: '',
            email: '',
        }
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name] : value});
    };
    
    onSearch = () => {
        let notEmptyFields = {};
        for (let key in this.state){
            this.state[key] && (notEmptyFields[key] = this.state[key].toLowerCase())
        }
        this.props.onSearch(notEmptyFields);
    }

    render(){
        const {name, lastName, email} = this.state;

        return this.props.isShown ? 
            null : (
                <div class={style.searchGroup}>
                    <div class={style.searchGroupLabel}> Search by fields: </div>
                    
                    <div class={style.searchItems}>
                        <SearchItem label='First name' name='name' value={name} onChange={this.onChange}/>
                        <SearchItem label='Last name' name='lastName' value={lastName} onChange={this.onChange}/>
                        <SearchItem label='Email' name='email' value={email} onChange={this.onChange}/>
                    </div>
                    
                    <button onClick={this.onSearch} class={`${style.searchBtn} saveBtn`}>Search</button>
                </div>
            )
    }
    
};

export default SearchArea;
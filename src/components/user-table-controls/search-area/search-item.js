import { h, Component } from 'preact';
import style from './style.css';

const SearchItem = ({label, value, name, onChange, isDate}) =>  {
    return (
        <div class={style.searchItem}>
            <label>{label}</label>
            <input type={isDate ? "date" : 'text'} value={value} name={name} onChange={onChange}/>
        </div>
    )
}

export default SearchItem;
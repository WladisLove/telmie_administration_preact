import { h, Component } from 'preact';
import style from './style.css';

const SearchItem = ({label, value, name, onChange}) =>  {
    return (
        <div class={style.searchItem}>
            <label>{label}</label>
            <input value={value} name={name} onChange={onChange}/>
        </div>
    )
}

export default SearchItem;
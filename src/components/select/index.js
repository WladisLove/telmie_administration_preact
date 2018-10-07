import { h, Component } from 'preact';
import style from './style.css';

const Select = (props) => {
    
    return (
        <div class={style.formSelect}>
            {props.label && <label>{props.label}</label>}
            <select name={props.name}
                disabled={props.disabled}
                onChange={props.onChange}
                value = {props.value}>
                {
                    props.data && props.data.length !== 0 && ( props.data.map(el => {
                        return props.isArrayData ? 
                            (<option value={el} key={el}>{el}</option>) 
                            : (<option value={el.value} key={el.value}>{el.name}</option>)
                    }))
                }
            </select>
        </div>
    )
};

export default Select;
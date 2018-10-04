import { h, Component } from 'preact';
import style from './style.css';

const Input = props => {

    return (
        <div class={style.formInput}>
            {props.label && <label>{props.label}</label>}
            <input
                type="text"
                disabled={props.disabled}
                placeholder = {props.placeholder}
                name={props.name}
                onChange={props.onChange}
                value = {props.value}/>
        </div>
    )
};

export default Input;
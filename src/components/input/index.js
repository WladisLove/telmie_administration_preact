import { h, Component } from 'preact';
import style from './style.css';

const Input = props => {
    let value = '', placeholder = '';
    props.isToPlaceholder ? (
        value = '',
        placeholder = props.value
    ) : (
        {value, placeholder} = props
    )
    
    return (
        <div style={{marginBottom: 15}}>
            <div class={style.formInput}>
                {props.label && <label>{props.label}</label>}
                <input
                    style={props.inputStyle ? props.inputStyle : {}}
                    type="text"
                    disabled={props.disabled}
                    placeholder = {placeholder}
                    name={props.name}
                    onChange={props.onChange}
                    value = {value}/>
            </div>
            {props.info && <div class={style.info}>{props.info}</div>}
        </div>
    )
};

export default Input;
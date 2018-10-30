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

    let isChanged = props.changedFields ? props.changedFields.hasOwnProperty(props.name) : false;

    return (
        <div style={{marginBottom: 15}}>
            <div class={`${style.formInput} ${isChanged && style.formInputChanged}`}>
                {props.label && <label>{props.label}</label>}
                <div class={style.inputContainer}>
                    {
                        isChanged ? [
                            <div class={style.prevValue} style={props.inputStyle ? props.inputStyle : {}}>{props.changedFields[props.name]}</div>,
                            <input
                                style={props.inputStyle ? props.inputStyle : {}}
                                type="text"
                                disabled={props.disabled}
                                placeholder = {placeholder}
                                name={props.name}
                                onChange={props.onChange}
                                value = {value}/>
                        ] : (
                            <input
                                style={props.inputStyle ? props.inputStyle : {}}
                                type="text"
                                disabled={props.disabled}
                                placeholder = {placeholder}
                                name={props.name}
                                onChange={props.onChange}
                                value = {value}/>
                        )
                    }
                </div>
            </div>
            {props.info && <div class={style.info}>{props.info}</div>}
        </div>
    )
};

export default Input;
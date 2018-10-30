import { h, Component } from 'preact';
import style from './style.css';

const Textarea = props => {

    let isChanged = props.changedFields ? props.changedFields.hasOwnProperty(props.name) : false;

    return (
        <div class={`${style.formTextarea} ${isChanged && style.formTaChanged}`}>
            {props.label && <label>{props.label}</label>}
            <div class={style.taConteiner}>
                {
                    isChanged ? [
                        <div class={style.prevValue}>{props.changedFields[props.name]}</div>,
                        <textarea
                            rows="2"
                            disabled={props.disabled}
                            placeholder = {props.placeholder}
                            name={props.name}
                            onChange={props.onChange}
                            value = {props.value}/>
                    ] : (
                        <textarea
                            rows="2"
                            disabled={props.disabled}
                            placeholder = {props.placeholder}
                            name={props.name}
                            onChange={props.onChange}
                            value = {props.value}/>
                    )
                }
            </div>
            
        </div>
    )
};

export default Textarea;
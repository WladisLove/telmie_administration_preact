import { h, Component } from 'preact';
import style from './style.css';

const Textarea = props => {

    return (
        <div class={style.formTextarea}>
            {props.label && <label>{props.label}</label>}
            <textarea
                rows="2"
                disabled={props.disabled}
                placeholder = {props.placeholder}
                name={props.name}
                onChange={props.onChange}
                value = {props.value}/>
        </div>
    )
};

export default Textarea;
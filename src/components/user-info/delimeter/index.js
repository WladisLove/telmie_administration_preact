import { h, Component } from 'preact';
import style from './style.css';

const Delimeter = props =>  {
    return (
        <div class={style.delimeter}>
            <div class={style.statusText}>{props.statusText}</div>
        </div>
    )
}

export default Delimeter;
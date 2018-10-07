import { h, Component } from 'preact';
import style from './style.css';


const NoteItem = props =>  {
    
    return (
        <div class={style.noteContainer}>
            
            <div class={style.dateDiv}>{props.date}</div>
            <div >{props.text}</div>
            
        </div>
    )
}

export default NoteItem;
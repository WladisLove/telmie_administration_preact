import { h, Component } from 'preact';
import style from './style.css';

const SearchItem = ({item, setItem}) =>  {
    const onClickHandler = () => setItem({...item});
    
    return (
        <div class={style.pushItem} onClick={onClickHandler}>
            <div class={style.pushTitle}>{item.title}</div>
            <div class={style.pushBody}>{item.body}</div>
        </div>
    )
}

export default SearchItem;
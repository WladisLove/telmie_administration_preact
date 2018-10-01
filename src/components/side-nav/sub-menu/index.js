import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from '../style';

const SubMenu = (props) => {
    const selectHandler = () => props.onSelect(props.menuKey);
    const makeActiveHandler = () => props.onSelect(props.menuKey, true);
    const isActive = props.menuKey === props.activeMenuKey,
        isSelected = props.menuKey === props.selectedMenuKey;

	return isSelected ? (
        <li class={isActive && style.active}>
            <div style={{marginBottom: 10, cursor: 'default'}}>{props.children}</div>
            <ul class = {style.subList}>
                {props.links.map(link => (
                    <li><Link activeClassName={style.active} onClick={makeActiveHandler} href={link.route} key={link.route}>{link.name}</Link></li>))}
            </ul>
        </li>
	) : (
        <li class={isActive && style.active} style={{cursor: 'default'}} onClick={selectHandler} >{props.children}</li>
    )
};

export default SubMenu;

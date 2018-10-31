import { h, Component } from 'preact';
import style from './style.css';

const Select = (props) => {
    
    let isChanged = props.changedFields ? props.changedFields.hasOwnProperty(props.name) : false;

    return (
        <div class={`${style.formSelect} ${isChanged && style.formSelectChanged}`}>
            {props.label && <label>{props.label}</label>}
            <div class={style.selectContainer}>
            {
                isChanged ? [
                    <div class={style.prevValue} style={props.inputStyle ? props.inputStyle : {}}>{props.changedFields[props.name]}</div>,
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
                ] : (
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
                )
            }
            </div>
            
        </div>
    )
};

export default Select;
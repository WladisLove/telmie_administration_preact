import { h, Component } from 'preact';
import style from './style.css';

const Input = props => {
    
    let value = '', placeholder = '', tmp;
    props.isToPlaceholder ? (
        value = '',
        placeholder = props.value
    ) : (
        {value, placeholder} = props
    );

    /* date coditions */
    const {type = 'text'} = props;
    type === 'date' && (
        tmp = new Date(value),
        value = `${tmp.getFullYear()}-${tmp.getMonth() + 1}-${tmp.getDate()}`
    );
    const onChangeDate = (e) => {
        console.log(e.target.value);

        props.onChange({
            ...e,
            target: {
                ...e.target,
                value: e.target.value
            }
        })
    };

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
                                type={type}
                                disabled={props.disabled}
                                placeholder = {placeholder}
                                name={props.name}
                                onChange={type === 'date' ? onChangeDate : props.onChange}
                                value = {value}/>
                        ] : (
                            <input
                                style={props.inputStyle ? props.inputStyle : {}}
                                type={type}
                                disabled={props.disabled}
                                placeholder = {placeholder}
                                name={props.name}
                                onChange={type === 'date' ? onChangeDate : props.onChange}
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
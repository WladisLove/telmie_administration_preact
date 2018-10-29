import { h, Component } from 'preact';
import Input from '../../input'
import Select from '../../select'
import Textarea from '../../textarea'
import Card from '../../card'
import ApproveArea from './approve-area'

import style from './style.css';

class BusinessProDetail extends Component {
    constructor(props){
        super(props);

        this.state = {
            category: '',
            subCategory: '',
        };
    }

    onChange = (e) => {
        const {name, value} = e.target;

        this.setState( prev => ({
            ...prev,
            [name]: value,
        }))
    }

    onSelectCategory = (e) => {
        const {value} = e.target;
		this.setState(prev => ({
                ...prev,
                category: value,
                subCategory: '',
            })
        )
    }
	

    render(){
        //const {category, subCategory} = this.state;
        const {categories, subCategories, isPending = false, user = {}, activateUser, controlsFunc } = this.props;
        const {location = null,mobile,video, pro={}} = user;
        const {category, subCategory,profession,professionDescription, costPerMinute = 0} = pro;
        const {country,city,line1,postCode} = JSON.parse(location) ? JSON.parse(location) : {};

        return (
            <div class={''}>
                <div class='headline'>Business Pro details</div>
                <Card cardClass={style.proDetailsCard} class={style.cardContent}>
                    <div class={style.detailsArea}>
                        <Input label='Business name:' name='' disabled={isPending}/>
                        <Input label='Companies House registration number:' name='' disabled={isPending}/>
                        <Input label='Company address :' name='' value={line1} disabled={isPending}/>
                        <div class='doubleInput'>
                            <Input label='City:' name='1' value={city} disabled={isPending}/>
                            <Input label='Post Code:' name='2' value={postCode} disabled={isPending}/>
                        </div>
                        <Input label='Country:' name='3' value={country} disabled={isPending}/>

                        {/* date */}

                        <Input label='Service name:' name='4' value={profession} disabled={isPending}/>
                        <Select label='Service category:' name='category' value={category} data={categories} onChange={this.onSelectCategory} isArrayData disabled={isPending}/>
                        <Select label='Service sub-category:' name='subCategory' value={subCategory} data={subCategories[category] ? subCategories[category] : []} onChange={this.onChange} isArrayData disabled={isPending}/>                    
                        <Textarea label='Service description:' value={professionDescription} disabled={isPending}/>
    
                        <div style={{display: 'inline-block',width: '20%'}}>
                            <Input value={'£'} disabled={true}/>
                            {/*<Select isArrayData value={'£'}/>*/}
                        </div>
                        <div style={{display: 'inline-block',width: '47%', marginLeft: '3%'}}>
                            <Input name='5' value={costPerMinute} disabled={isPending}/>
                        </div>
                        <div style={{display: 'inline-block',width: '27%', marginLeft: '3%'}}>
                            <Input value={'min'} disabled={true}/>
                            {/*<Select data={['test','test2']} isArrayData value={'min'}/>*/}
                        </div>

                        <Input label='Mobile:' name='' value={mobile} disabled={isPending}/>
                        <Input label='YouTube ID:' name='' value={video} disabled={isPending}/>
                    </div>

                    {isPending && <ApproveArea activateUser={activateUser} controlsFunc={controlsFunc} userId = {user.id}/>}
                </Card>
            </div>
        )
    }
}

export default BusinessProDetail;
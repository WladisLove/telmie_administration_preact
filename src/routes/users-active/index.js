import { h, Component } from 'preact';
import Card from '../../components/card'
import { Table, Checkbox, Button } from 'antd';
import UserInfo from '../../components/user-info'
import 'antd/dist/antd.css';
import style from './style'


const columns = [{
  title: 'Id',
  dataIndex: 'id',
  defaultSortOrder: 'ascend',
  sorter: (a, b) => a.id - b.id,
},{
  title: 'First name',
  dataIndex: 'firstName',
  sorter: (a,b) => String(a.firstName).localeCompare(b.firstName),
},{
  title: 'Last name',
  dataIndex: 'lastName',
  sorter: (a,b) => String(a.lastName).localeCompare(b.lastName),
}, {
  title: 'Email',
  dataIndex: 'email',
  sorter: (a,b) => String(a.email).localeCompare(b.email),
},{
	title: 'Status',
	dataIndex: 'status',
	sorter: (a,b) => String(a.status).localeCompare(b.status),
},{
  title: 'Last active',
  dataIndex: 'lastActive',
  // compare date
  sorter: (a, b) => a.lastActive.length - b.lastActive.length,
},{
  title: 'Credit card',
  dataIndex: 'creditCard',
  // are kinds only 'yes'/'no' ???
  sorter: (a, b) => a.creditCard.length - b.creditCard.length,
},{
  title: 'Registration date',
  dataIndex: 'registrationDate',
  // compare date
  sorter: (a, b) => a.registrationDate.length - b.registrationDate.length,
},{
  title: 'Bank account',
  dataIndex: 'bankAccount',
  // are kinds only 'yes'/'no' ???
  sorter: (a, b) => a.bankAccount.length - b.bankAccount.length,
},{
  title: 'Total earning',
  dataIndex: 'totalEarning',
  sorter: (a, b) => a.totalEarning - b.totalEarning,
},];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

const statusArr = [{
	name: 'Registered',
}, {
	name: 'Suspended',
}, {
	name: 'Started Pro Appl',
}, {
	name: 'Pending Approval',
}, {
	name: 'Approved as Pro',
}, {
	name: 'Suspended as Pro',
}];

const getDefaultStatuses = () => statusArr.map(el => el.name);


export default class ActiveUsers extends Component{
	constructor(props){
		super(props);

		this.state = {
			statusFilter: getDefaultStatuses() || [],
			isFiltered: false,
			filteredData: [],
			selectedUser: null,
			data: [{
				id: '11245',
				firstName: 'Barry',
				lastName: 'Brown',
				email: '',
				status: 'Started Pro Appl',
				lastActive: '',
				creditCard: 'yes',
				registrationDate: '',
				bankAccount: 'no',
				totalEarning: 22,
			}, {
				id: '2',
				firstName: 'Adam',
				lastName: 'Green',
				email: '',
				status: 'Approved as Pro',
				lastActive: '',
				creditCard: 'no',
				registrationDate: '',
				bankAccount: 'yes',
				totalEarning: 2,
			}, {
				id: '3',
				firstName: 'Jack',
				lastName: 'Black',
				email: 'klimen1997@gmail/com',
				status: 'Approved as Pro',
				lastActive: '',
				creditCard: 'yes',
				registrationDate: '',
				bankAccount: 'yes',
				totalEarning: 11,
			}, {
				id: '4',
				firstName: 'Jim',
				lastName: 'Red',
				email: '',
				status: 'Registered',
				lastActive: '',
				creditCard: 'no',
				registrationDate: '',
				bankAccount: 'yes',
				totalEarning: 0,
			}]
		}
	}

	onChange = (checkedValues) => {
		this.setState({statusFilter: [...checkedValues]});
	}

	onFilter = () => {
		const {data = [], statusFilter} = this.state;
		if (statusFilter.length === statusArr.length){
			this.setState({ filteredData: [], isFiltered: false });
		} else {
			let newData = data.filter(el => statusFilter.indexOf(el.status) != -1 );
			this.setState({ filteredData: newData, isFiltered: true });
		}
	}

	onRow = (record) => {
		return {
			onClick: () => this.setState({ selectedUser: record })
		}
	}

	onBackToList = () => {
		this.setState({ selectedUser: null })
	}

	render(){
		const {statusFilter, data, isFiltered, filteredData, selectedUser} = this.state;

		const dataSource = isFiltered ? filteredData : data;
		return (
			<Card cardClass='route-content'>
					{
						selectedUser ? 
							<UserInfo user={selectedUser}
								backToList={this.onBackToList}/>
								:
							[
								(<div class={style.filterGroup}>
									<div class={style.filterGroupLabel}> Status filter: </div>
									
									<Checkbox.Group onChange={this.onChange} value={statusFilter}	>
										{statusArr.map(({name}) => (<Checkbox className={statusFilter.indexOf(name) != -1 && style.checked} 
																						key={name} value={name}>{name}</Checkbox>))}
									</Checkbox.Group>
									
									<Button size='small' onClick={this.onFilter} className={style.filterBtn}>Filter</Button>
								</div>) ,
								(<Table columns={columns} 
									rowKey={(record) => record.id} 
									onRow={this.onRow}
									dataSource={dataSource} 
									onChange={onChange} />)
							]
													
					}
				
			</Card>
		)
	}
	
};
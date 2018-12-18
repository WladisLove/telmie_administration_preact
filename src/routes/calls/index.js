import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card'
import SearchArea from '../../components/user-table-controls/search-area'
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import { getCalls, clearCalls, } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { callsColumns as columns } from '../../helpers/table-data'
import { PAGE_SIZE } from '../../helpers/consts'

const searchItemsArr = [{
	label: 'Pro info:',
	name: 'proGeneral',
},{
	label: 'Client info:',
	name: 'clGeneral',
},{
	label: 'Date interval:',
	name: 'startDate',
	isDate: true,
},{
	label: '-',
	name: 'endDate',
	isDate: true,
},]
class Invites extends Component{
	constructor(props){
		super(props);

		this.state= {
			sortedInfo: {},
		}
	}

	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		this.userAuth && this.props.getCalls(this.userAuth);
	};

	componentWillUnmount(){
		this.props.clearCalls();
	}

	onChange = (pagination, filters, sorter) => {
		this.setState({ sortedInfo: sorter, });
	}
	
	onSearch = (searchFields) => {
		let usersArr = [...this.props.uArrays.calls];

		if (!Object.keys(searchFields).length){
			this.setState({ searchedData: [], isSearched: false });
		} else {
			let newData = usersArr.filter(call => {
				const {consultantEmail = '', consultantFullName = '', consultantId = '',
					consultedEmail = '', consultedFullName = '', consultedId = '',
					startDate,
				} = call;

				const _date = new Date(startDate).getTime();

				if(searchFields.proGeneral){
					if(
						(consultantEmail.toLowerCase().indexOf(searchFields.proGeneral) + 1)
						|| (consultantFullName.toLowerCase().indexOf(searchFields.proGeneral) + 1)
						|| (consultantId.toString().indexOf(searchFields.proGeneral) + 1)
					) return true;
					else return false;
				}

				if(searchFields.clGeneral){
					if(
						(consultedEmail.toLowerCase().indexOf(searchFields.clGeneral) + 1)
						|| (consultedFullName.toLowerCase().indexOf(searchFields.clGeneral) + 1)
						|| (consultedId.toString().indexOf(searchFields.clGeneral) + 1)
					) return true;
					else return false;
				}

				if(searchFields.startDate && searchFields.startDate){
					if(
						_date <= (new Date(searchFields.endDate).getTime())
							&& _date >= (new Date(searchFields.startDate).getTime())
					) return true;
					else return false;
				} else if (searchFields.startDate) {
					if(
						_date >= (new Date(searchFields.startDate).getTime())
					) return true;
					else return false;
				} else if (searchFields.endDate){
					if(
						_date <= (new Date(searchFields.endDate).getTime())
					) return true;
					else return false;
				}
				return true;
			})

			this.setState({ searchedData: newData, isSearched: true, });
		}
	}

	render(){
		const {isSearched, searchedData, sortedInfo = {} } = this.state;

		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', calls = []} = this.props.uArrays;

		const dataSource = isSearched ? searchedData : calls;

		return (
			<Card cardClass='route-content'>
				<p>Total number of calls: {calls.length}</p>
				<p style={{marginBottom: 5}}>Transaction types:</p>
				<ul class='typesDescription'>
					<li><span>ACTIVE</span>		call, which active now</li>
					<li><span>FAILED</span>		call, which not started (no answer or drop)</li>		
					<li><span>SUCCEED</span>		call, which successfully ended</li>
					<li><span>BREAK	</span>	call, which was broken because customer don't have enought money</li>
					<li><span>DISCONNECTED</span>		call drop because one of the participants was disconnected</li>	
					<li><span>BROKEN</span>		hung call (if call has active status duration and amount = 0 but start date was 8 hours ago)</li>
					
				</ul>
				{isLoaded ? 
					!isError ? [
						<SearchArea onSearch={this.onSearch} searchItemsArr={searchItemsArr}/>,
						<Table columns={columns(sortedInfo)} 
							rowKey={(record) => record.id} 
							onChange={this.onChange}
							pagination={{pageSize: PAGE_SIZE}}
							dataSource={dataSource} />
					] : (
					<div class="errorContainer">
						Error! 
						<div class="errorMsg">{errorMsg}</div>
					</div>) 
					: (<div class='spinContainer'><Spin size='large'/></div>)}
			</Card>
		);
	}
} 

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	uArrays: state.usersArrays,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getCalls,
	clearCalls,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Invites);
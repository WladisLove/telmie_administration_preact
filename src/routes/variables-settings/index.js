import { h } from 'preact';
import Fees from '../../components/fees-card'
import WithdrawalFee from '../../components/withdrawal-fee-card'
import Credits from '../../components/credits-card'

const VariablesSettings = () => (
	<div class='route-content'>
		<Fees/>
		<WithdrawalFee/>
		<Credits/>
	</div>
);

export default VariablesSettings;

import { h } from 'preact';
import BalanceItem from './balance-item'
import TransactionItem from './transaction-item'
import Card from '../../card'
import style from './style.css';

const MoneyTab = ({data = {}, getMoney, userId}) => {
    const {results = []} = data;

    const showAll = () => getMoney(userId, 0, data.total);

    return (
        <div style={{paddingTop: '20px' }}>
            <div class={style.balanceLine}>
                <BalanceItem balance={data.balance} text='Free credits'/>
                <BalanceItem balance={data.proBalance} text='Earnings'/>
            </div>
            {
                results.length !== data.total && <div class={style.showAllBtn} onClick={showAll}>
                    Show all
                </div>
            }
            <Card cardClass={style.tableCard}>
                <div class={`${style.tableRow} ${style.tableHeader}`}>
                    <div>Transaction</div>
                    <div>Date</div>
                    <div>Duration</div>
                    <div>Balance</div>
                </div>

                {
                    results.map(el => <TransactionItem {...el} key={el.date}/>)
                }
                {
                    !results.length && <div class={style.emptyList}>No recent transactions</div>
                }
            </Card>
        </div>
    )
}

export default MoneyTab;
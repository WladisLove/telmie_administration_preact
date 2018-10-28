import {convertDate} from './index'
export const tableColumns = [{
    title: 'Id',
    dataIndex: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.id - b.id,
  },{
    title: 'First name',
    dataIndex: 'name',
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
    render: (text) => convertDate(text),
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
import {convertDate} from './index'

export const pendingTableColumns = [{
  title: 'Id',
  dataIndex: 'owner.id',
  defaultSortOrder: 'ascend',
  sorter: (a, b) => a.owner.id - b.owner.id,
},{
  title: 'First name',
  dataIndex: 'owner.name',
  sorter: (a,b) => String(a.owner.name).localeCompare(b.owner.name),
},{
  title: 'Last name',
  dataIndex: 'owner.lastName',
  sorter: (a,b) => String(a.owner.lastName).localeCompare(b.owner.lastName),
}, {
  title: 'Email',
  dataIndex: 'owner.email',
  sorter: (a,b) => String(a.owner.email).localeCompare(b.owner.email),
},{
    title: 'Status',
    dataIndex: 'owner.status',
    //sorter: (a,b) => String(a.status).localeCompare(b.status),
},{
  title: 'Last active',
  dataIndex: 'owner.lastActive',
  // compare date
  //sorter: (a, b) => a.owner.lastActive.length - b.owner.lastActive.length,
},{
  title: 'Credit card',
  dataIndex: 'owner.creditCard',
  // are kinds only 'yes'/'no' ???
  //sorter: (a, b) => a.creditCard.length - b.creditCard.length,
},{
  title: 'Registration date',
  dataIndex: 'owner.registrationDate',
  render: (text) => convertDate(text),
  // compare date
  sorter: (a, b) => new Date(a.owner.registrationDate).getTime() - new Date(b.owner.registrationDate).getTime(),
},{
  title: 'Bank account',
  dataIndex: 'owner.bankAccount',
  // are kinds only 'yes'/'no' ???
  //sorter: (a, b) => a.bankAccount.length - b.bankAccount.length,
},{
  title: 'Total earning',
  dataIndex: 'owner.totalEarning',
  //sorter: (a, b) => a.totalEarning - b.totalEarning,
},];

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
      //sorter: (a,b) => String(a.status).localeCompare(b.status),
  },{
    title: 'Last active',
    dataIndex: 'lastActive',
    // compare date
    //sorter: (a, b) => a.lastActive.length - b.lastActive.length,
  },{
    title: 'Credit card',
    dataIndex: 'creditCard',
    // are kinds only 'yes'/'no' ???
    //sorter: (a, b) => a.creditCard.length - b.creditCard.length,
  },{
    title: 'Registration date',
    dataIndex: 'registrationDate',
    render: (text) => convertDate(text),
    // compare date
    //sorter: (a, b) => a.registrationDate.length - b.registrationDate.length,
  },{
    title: 'Bank account',
    dataIndex: 'bankAccount',
    // are kinds only 'yes'/'no' ???
    //sorter: (a, b) => a.bankAccount.length - b.bankAccount.length,
  },{
    title: 'Total earning',
    dataIndex: 'totalEarning',
    //sorter: (a, b) => a.totalEarning - b.totalEarning,
  },];
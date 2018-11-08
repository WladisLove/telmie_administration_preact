import {convertDate} from './index'
import { INFO_TYPES } from './consts'

export const pendingTableColumns = (sInfo = {}) => ([{
  title: 'Appl ID',
  dataIndex: 'id',
  sorter: (a, b) => a.id - b.id,
  sortOrder: sInfo.columnKey === 'id' && sInfo.order,
},{
  title: 'User ID',
  dataIndex: 'owner.id',
  sorter: (a, b) => a.owner.id - b.owner.id,
  sortOrder: sInfo.columnKey === 'owner.id' && sInfo.order,
},{
  title: 'First name',
  dataIndex: 'owner.name',
  sorter: (a,b) => String(a.owner.name).localeCompare(b.owner.name),
  sortOrder: sInfo.columnKey === 'owner.name' && sInfo.order,
},{
  title: 'Last name',
  dataIndex: 'owner.lastName',
  sorter: (a,b) => String(a.owner.lastName).localeCompare(b.owner.lastName),
  sortOrder: sInfo.columnKey === 'owner.lastName' && sInfo.order,
}, {
  title: 'Email',
  dataIndex: 'owner.email',
  sorter: (a,b) => String(a.owner.email).localeCompare(b.owner.email),
  sortOrder: sInfo.columnKey === 'owner.email' && sInfo.order,
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
  sortOrder: sInfo.columnKey === 'owner.registrationDate' && sInfo.order,
},{
  title: 'Bank account',
  dataIndex: 'owner.bankAccount',
  // are kinds only 'yes'/'no' ???
  //sorter: (a, b) => a.bankAccount.length - b.bankAccount.length,
},{
  title: 'Total earning',
  dataIndex: 'owner.totalEarning',
  //sorter: (a, b) => a.totalEarning - b.totalEarning,
},]);

export const withdrawalsTableColumns = (sInfo = {}, btnsRender) => ([{
  title: 'ID',
  dataIndex: 'id',
  defaultSortOrder: 'ascend',
  sorter: (a, b) => a.id - b.id,
  sortOrder: sInfo.columnKey === 'id' && sInfo.order,
},{
  title: 'First name',
  dataIndex: 'name',
},{
  title: 'Last name',
  dataIndex: 'lastName',
},{
  title: 'Email',
  dataIndex: 'email',
},{
  title: 'Withdrawal Amount',
  dataIndex: 'amount',
  render: text => (<div style={{textAlign: 'center'}}>{text}</div>),
  sorter: (a, b) => a.amount - b.amount,
  sortOrder: sInfo.columnKey === 'amount' && sInfo.order,
},{
  title: 'Action',
  dataIndex: '',
  render: btnsRender
}]);

export const tableColumns = (sInfo = {}) => ([{
    title: 'Id',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
    sortOrder: sInfo.columnKey === 'id' && sInfo.order,
  },{
    title: 'First name',
    dataIndex: 'name',
    sorter: (a,b) => String(a.firstName).localeCompare(b.firstName),
    sortOrder: sInfo.columnKey === 'name' && sInfo.order,
  },{
    title: 'Last name',
    dataIndex: 'lastName',
    sorter: (a,b) => String(a.lastName).localeCompare(b.lastName),
    sortOrder: sInfo.columnKey === 'lastName' && sInfo.order,
  }, {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a,b) => String(a.email).localeCompare(b.email),
    sortOrder: sInfo.columnKey === 'email' && sInfo.order,
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
  },]);

export const incomplTableColumns = (sInfo = {}) => ([{
  title: 'Email',
  dataIndex: 'email',
  sorter: (a,b) => String(a.email).localeCompare(b.email),
  sortOrder: sInfo.columnKey === 'email' && sInfo.order,
},{
  title: 'Date',
  dataIndex: 'date',
  render: (text) => convertDate(text),
  sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  sortOrder: sInfo.columnKey === 'date' && sInfo.order,
},{
  title: 'Mobile',
  dataIndex: 'mobile',
}]) 

export const infoColumns = (infoType) => {
  switch (infoType){
    case INFO_TYPES.ACTIVITIES:
    case INFO_TYPES.CLIENTS:
      return ([{
        title: 'Activity',
        dataIndex: 'activity',
        sorter: (a,b) => String(a.activity).localeCompare(b.activity),
      },{
        title: 'Activity Date',
        dataIndex: 'activityDate',
        render: (text) => convertDate(text),
        // compare date
        sorter: (a, b) => new Date(a.activityDate).getTime() - new Date(b.activityDate).getTime(),
      },{
        title: 'First name',
        dataIndex: 'name',
        sorter: (a,b) => String(a.name).localeCompare(b.name),
      },{
        title: 'Last name',
        dataIndex: 'lastName',
        sorter: (a,b) => String(a.lastName).localeCompare(b.lastName),
      },{
        title: 'Email',
        dataIndex: 'email',
        sorter: (a,b) => String(a.email).localeCompare(b.email),
      },])
    case INFO_TYPES.LIST_OF_PROS:
      return ([{
        title: 'ID',
        dataIndex: 'id',
        sorter: (a,b) => a.id - b.id,
      },{
        title: 'First name',
        dataIndex: 'name',
        sorter: (a,b) => String(a.name).localeCompare(b.name),
      },{
        title: 'Last name',
        dataIndex: 'lastName',
        sorter: (a,b) => String(a.lastName).localeCompare(b.lastName),
      },{
        title: 'Email',
        dataIndex: 'email',
        sorter: (a,b) => String(a.email).localeCompare(b.email),
      },])
  }
}
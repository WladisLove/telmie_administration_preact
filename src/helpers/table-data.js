import {convertDate, sortVersions, secToMS, secToDH, secToHMS} from './index'
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
  dataIndex: 'user.name',
},{
  title: 'Last name',
  dataIndex: 'user.lastName',
},{
  title: 'Email',
  dataIndex: 'user.email',
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
    width: 70,
    fixed: 'left',
    sorter: (a, b) => a.id - b.id,
    sortOrder: sInfo.columnKey === 'id' && sInfo.order,
  },{
    title: 'First name',
    dataIndex: 'name',
    width: 150,
    fixed: 'left',
    sorter: (a,b) => String(a.firstName).localeCompare(b.firstName),
    sortOrder: sInfo.columnKey === 'name' && sInfo.order,
  },{
    title: 'Last name',
    dataIndex: 'lastName',
    width: 150,
    fixed: 'left',
    sorter: (a,b) => String(a.lastName).localeCompare(b.lastName),
    sortOrder: sInfo.columnKey === 'lastName' && sInfo.order,
  }, {
    title: 'Email',
    dataIndex: 'email',
    width: 220,
    sorter: (a,b) => String(a.email).localeCompare(b.email),
    sortOrder: sInfo.columnKey === 'email' && sInfo.order,
  },{
    title: 'Status',
    dataIndex: 'status',
    width: 140,
    render: text => (<div style={{fontSize: 12}}>{text}</div>),
    //sorter: (a,b) => String(a.status).localeCompare(b.status),
  },{
    title: 'App version',
    dataIndex: 'appVersion',
    width: 100,
    sorter: (a, b) => sortVersions(a.appVersion, b.appVersion),
    sortOrder: sInfo.columnKey === 'appVersion' && sInfo.order,
  },{
    title: 'Locale',
    dataIndex: 'locale',
    width: 80,
    sorter: (a,b) => String(a.locale).localeCompare(b.locale),
    sortOrder: sInfo.columnKey === 'locale' && sInfo.order,
  },{
    title: 'Last active',
    dataIndex: 'dateLastActive',
    width: 170,
    render: (text, record) => record.activeNow ? 'active now' : convertDate(text),
    sorter: (a, b) => {
      const _a = a.dateLastActive ? new Date(a.dateLastActive).getTime() : null;
      const _b = b.dateLastActive ? new Date(b.dateLastActive).getTime() : null;
      return (_a === null && _b === null) ? 0 : (_a === null) ? 1 : (_b === null) ? -1 : _a - _b;
    },
    sortOrder: sInfo.columnKey === 'dateLastActive' && sInfo.order,
  },{
    title: 'Registration date',
    dataIndex: 'registrationDate',
    width: 170,
    render: (text) => convertDate(text),
    sorter: (a, b) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime(),
    sortOrder: sInfo.columnKey === 'registrationDate' && sInfo.order,
  },{
    title: 'Email Notif.',
    dataIndex: 'emailNotifications',
    width: 70,
    render: (text) => text.toString(),
    sorter: (a, b) => a.emailNotifications - b.emailNotifications,
    sortOrder: sInfo.columnKey === 'emailNotifications' && sInfo.order,
  },{
    title: 'Card',
    dataIndex: 'card',
    width: 70,
    render: (text) => text.toString(),
    sorter: (a, b) => a.card - b.card,
    sortOrder: sInfo.columnKey === 'card' && sInfo.order,
  },{
    title: 'Telmie Credit',
    dataIndex: 'telmieCredit',
    width: 100,
    sorter: (a, b) => a.telmieCredit - b.telmieCredit,
    sortOrder: sInfo.columnKey === 'telmieCredit' && sInfo.order,
  },{
    title: 'Payment From Card',
    dataIndex: 'paymentFromCard',
    width: 100,
    sorter: (a, b) => a.paymentFromCard - b.paymentFromCard,
    sortOrder: sInfo.columnKey === 'paymentFromCard' && sInfo.order,
  },{
    title: 'Total',
    children: [{
      title: 'Active',
      dataIndex: 'activeFor',
      width: 100,
      render: (text) => secToDH(text),
      sorter: (a, b) => a.activeFor - b.activeFor,
      sortOrder: sInfo.columnKey === 'activeFor' && sInfo.order,
    },{
      title: 'Spend',
      dataIndex: 'totalSpend',
      width: 100,
      sorter: (a, b) => Math.abs(a.totalSpend) - Math.abs(b.totalSpend),
      sortOrder: sInfo.columnKey === 'totalSpend' && sInfo.order,
    },{
      title: 'Earn',
      dataIndex: 'totalEarn',
      width: 100,
      sorter: (a, b) => a.totalEarn - b.totalEarn,
      sortOrder: sInfo.columnKey === 'totalEarn' && sInfo.order,
    },{
      title: 'Text Outgoing',
      dataIndex: 'totalTextOutgoing',
      width: 100,
      sorter: (a, b) => a.totalTextOutgoing - b.totalTextOutgoing,
      sortOrder: sInfo.columnKey === 'totalTextOutgoing' && sInfo.order,
    },{
      title: 'Text Incoming',
      dataIndex: 'totalTextIncoming',
      width: 100,
      sorter: (a, b) => a.totalTextIncoming - b.totalTextIncoming,
      sortOrder: sInfo.columnKey === 'totalTextIncoming' && sInfo.order,
    },{
      title: 'Minutes Outgoing',
      dataIndex: 'totalMinsOutgoing',
      width: 100,
      render: (text) => secToHMS(text),
      sorter: (a, b) => a.totalMinsOutgoing - b.totalMinsOutgoing,
      sortOrder: sInfo.columnKey === 'totalMinsOutgoing' && sInfo.order,
    },{
      title: 'Minutes Incoming',
      dataIndex: 'totalMinsIncoming',
      width: 100,
      render: (text) => secToHMS(text),
      sorter: (a, b) => a.totalMinsIncoming - b.totalMinsIncoming,
      sortOrder: sInfo.columnKey === 'totalMinsIncoming' && sInfo.order,
    }]
  }]);

export const invitesColumns = (sInfo = {}) => ([{
  title: 'Date',
  dataIndex: 'date',
  defaultSortOrder: 'descend',
  render: (text) => convertDate(text),
  sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  sortOrder: sInfo.columnKey === 'date' && sInfo.order,
},{
  title: 'Invite type',
  dataIndex: 'type',
},{
  title: 'Receiver Email',
  dataIndex: 'receiverEmail',
  sorter: (a,b) => String(a.receiverEmail).localeCompare(b.receiverEmail),
  sortOrder: sInfo.columnKey === 'receiverEmail' && sInfo.order,
},{
  title: 'Receiver Name',
  dataIndex: 'receiverName',
  sorter: (a,b) => String(a.receiverName).localeCompare(b.receiverName),
  sortOrder: sInfo.columnKey === 'receiverName' && sInfo.order,
},{
  title: 'Receiver Role',
  dataIndex: 'receiverRole',
},{
  title: 'Sender Email',
  dataIndex: 'senderEmail',
  sorter: (a,b) => String(a.senderEmail).localeCompare(b.senderEmail),
  sortOrder: sInfo.columnKey === 'senderEmail' && sInfo.order,
},{
  title: 'Sender Full Name',
  dataIndex: 'senderFullName',
  sorter: (a,b) => String(a.senderFullName).localeCompare(b.senderFullName),
  sortOrder: sInfo.columnKey === 'senderFullName' && sInfo.order,
},{
  title: 'Sender Role',
  dataIndex: 'senderRole',
},{
  title: 'Status',
  dataIndex: 'status',
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
}]);

const activityTypes = {
  'c': 'CALLED',
  'mc': 'MISSED CALL',
  'fc': 'FAILED CALL',
  'im': 'READ message',
  'uim': 'NEW message',
  'om': 'OUTGOING message',
  's': 'SHORTLISTED',
}

export const infoColumns = (infoType) => {
  switch (infoType){
    case INFO_TYPES.ACTIVITIES:
    case INFO_TYPES.CLIENTS:
      return ([{
        title: 'Activity',
        dataIndex: 'activity',
        render: (text) => activityTypes[text] ? activityTypes[text].toLowerCase() : `unknown (${text})`,
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
export const callsColumns = (sInfo = {}, onClick) => ([{
  title: 'Id',
  dataIndex: 'id',
},{
  title: 'Pro Id',
  dataIndex: 'consultantId',
},{
  title: 'Pro Name',
  dataIndex: 'consultantFullName',
  render: (text, item) => <span class='table-selectable-name' onClick={onClick(item.consultantId)}>{text}</span>,
},{
  title: 'Pro Email',
  dataIndex: 'consultantEmail',
},{
  title: 'Client Id',
  dataIndex: 'consultedId',
},{
  title: 'Client Name',
  dataIndex: 'consultedFullName',
  render: (text, item) => <span class='table-selectable-name' onClick={onClick(item.consultedId)}>{text}</span>,
},{
  title: 'Client Email',
  dataIndex: 'consultedEmail',
},{
  title: 'Date',
  dataIndex: 'startDate',
  render: (text) => convertDate(text),
  sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  sortOrder: sInfo.columnKey === 'startDate' && sInfo.order,
},{
  title: 'Status',
  dataIndex: 'status',
},{
  title: 'Duration',
  dataIndex: 'duration',
  render: (text) => secToMS(text),
  sorter: (a, b) => a.duration - b.duration,
  sortOrder: sInfo.columnKey === 'duration' && sInfo.order,
},{
  title: 'Amount',
  dataIndex: 'amount',
  sorter: (a, b) => a.amount - b.amount,
  sortOrder: sInfo.columnKey === 'amount' && sInfo.order,
},]);

export const transactionsColumns = (sInfo = {}) => ([{
  title: 'User Id',
  dataIndex: 'userId',
},{
  title: 'User Name',
  dataIndex: 'userFullName',
},{
  title: 'User Email',
  dataIndex: 'userEmail',
},{
  title: 'Date',
  dataIndex: 'date',
  render: (text) => convertDate(text),
},{
  title: 'Type',
  dataIndex: 'transactionType',
},{
  title: 'Status',
  dataIndex: 'status',
},{
  title: 'Amount',
  dataIndex: 'amount',
  sorter: (a, b) => a.amount - b.amount,
  sortOrder: sInfo.columnKey === 'amount' && sInfo.order,
},{
  title: 'Fee',
  dataIndex: 'fee',
  sorter: (a, b) => a.fee - b.fee,
  sortOrder: sInfo.columnKey === 'fee' && sInfo.order,
},{
  title: 'Credit Type',
  dataIndex: 'creditType',
},]);
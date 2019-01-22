export const PAGE_SIZE = 20;

export const INFO_TYPES= {
    ACC_DETAILS: 'ACC_DETAILS',
    ACTIVITIES: 'ACTIVITIES', 
    MONEY: 'MONEY',
    CLIENTS: 'CLIENTS',
    LIST_OF_PROS: 'LIST_OF_PROS',
};

export const statusArrs = {
    users: [{
        name: 'Registered',
        value: 'REGISTERED',
    }, {
        name: 'Suspended',
        value: 'SUSPENDED',
    }, {
        name: 'Started Pro Appl',
        value: 'STARTED_PRO_APP',
    }, {
        name: 'Pending Approval',
        value: 'PENDING_APPROVAL',
    }, {
        name: 'Approved as Pro',
        value: 'APPROVED_AS_PRO',
    }, {
        name: 'Suspended as Pro',
        value: 'SUSPENDED_AS_PRO',
    }],
    invites: [{
        name: 'Pending',
        value: 'PENDING',
    }, {
        name: 'Registered as User',
        value: 'REGISTERED_AS_USER',
    }, {
        name: 'Accepted',
        value: 'ACCEPTED',
    }, {
        name: 'Get bonus',
        value: 'GET_BONUS',
    }],
    transactions: [{
        name: 'SYS_CHARGE',
        value: 'SYS_CHARGE',
    }, {
        name: 'CALL_PAY_USER',
        value: 'CALL_PAY_USER',
    }, {
        name: 'CALL_PAY_PRO',
        value: 'CALL_PAY_PRO',
    }, {
        name: 'PAYOUT',
        value: 'PAYOUT',
    }, {
        name: 'ADD_CARD',
        value: 'ADD_CARD',
    }, {
        name: 'ADD_FRIEND',
        value: 'ADD_FRIEND',
    }, {
        name: 'ADD_PRO',
        value: 'ADD_PRO',
    }, {
        name: 'SYSTEM_BONUS',
        value: 'SYSTEM_BONUS',
    }, {
        name: 'REGISTRATION',
        value: 'REGISTRATION',
    }],
    calls: [{
        name: 'ACTIVE',
        value: 'ACTIVE',
    }, {
        name: 'FAILED',
        value: 'FAILED',
    }, {
        name: 'SUCCEED',
        value: 'SUCCEED',
    }, {
        name: 'BREAK',
        value: 'BREAK',
    }, {
        name: 'DISCONNECTED',
        value: 'DISCONNECTED',
    }, {
        name: 'BROKEN',
        value: 'BROKEN',
    }]
};
export const apiRoot = 'http://sr461.2dayhost.com/api/';
// for main server
//export const apiRoot = 'https://telmie.com/api/';

export const apiAdminRoot = `${apiRoot}admin/`;

export const apiUrls = {
  LOG_IN: apiRoot + 'auth',
  GET_CATEGORIES: apiRoot + 'categories',
  GET_USERS: apiAdminRoot + 'users',
  GET_ACTIVE_USERS: apiAdminRoot + 'users/active',
  GET_ARCHIVED_USERS: apiAdminRoot + 'users/archived',
  GET_INCOMPLETE_USERS: apiAdminRoot + 'users/incomplete',
  GET_INVITES: apiAdminRoot + 'invites',
  GET_CALLS: apiAdminRoot + 'calls',
  GET_TRANSACTIONS: apiAdminRoot + 'transactions',
  GET_PENDINGS: apiAdminRoot + 'pending',
  PENDING_ID: (id) => (apiAdminRoot + 'pending/' + id),
  USER_ID: (id) => (apiAdminRoot + 'users/' + id),
  CHANGE_ACTIVE_USER_STATUS: (id) => (apiAdminRoot + 'users/' + id + '/status'),
  GET_WITHDRAWS: apiAdminRoot + 'withdraw',
  WITHDRAW_ID: (id) => (apiAdminRoot + 'withdraw/' + id),

  GET_USER_ACTIVITY: (id) => (apiAdminRoot + 'users/' + id + '/activity'),
  GET_USER_LIST: (id) => (apiAdminRoot + 'users/' + id + '/shortlist'),
  GET_USER_MONEY: (id, page, size) => (apiAdminRoot + 'users/' + id + '/money?page' + page + '&size=' + size),
  ADD_CREDITS: (amount, id) => (apiAdminRoot + 'users/' + id + '/addcredit?amount=' + amount),
}
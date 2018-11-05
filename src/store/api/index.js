export const apiRoot = 'http://sr461.2dayhost.com/api/';
export const apiAdminRoot = 'http://sr461.2dayhost.com/api/admin/';

// for main server
//export const apiRoot = 'https://telmie.com/api/';
//export const apiAdminRoot = 'https://telmie.com/api/admin/';

export const apiUrls = {
  LOG_IN: apiRoot + 'auth',
  GET_CATEGORIES: apiRoot + 'categories',
  GET_ACTIVE_USERS: apiAdminRoot + 'users/active',
  GET_ARCHIVED_USERS: apiAdminRoot + 'users/archived',
  GET_PENDINGS: apiAdminRoot + 'pending',
  ACTIVATE_USER: (id) => (apiAdminRoot + 'pending/' + id + '/activate'),
  EDIT_ACTIVE_USER: (id) => (apiAdminRoot + 'users/active/' + id),
  CHANGE_ACTIVE_USER_STATUS: (id) => (apiAdminRoot + 'users/active/' + id + '/enabledStatus'),
  RESTORE_ARCHIVED_USER: (id) => (apiAdminRoot + 'users/archived/' + id + '/restore'),
  GET_WITHDRAWS: apiAdminRoot + 'withdraw',
  GET_WITHDRAW_DETAIL: (id) => (apiAdminRoot + 'withdraw/' + id),
  APPROVE_WITHDRAW: (id) => (apiAdminRoot + 'withdraw/' + id + '/approve'),
  DECLINE_WITHDRAW: (id) => (apiAdminRoot + 'withdraw/' + id + '/decline'),
}

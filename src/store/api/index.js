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
  GET_INCOMPLETE_USERS: apiAdminRoot + 'users/incomplete',
  GET_PENDINGS: apiAdminRoot + 'pending',
  ACTIVATE_USER: (id) => (apiAdminRoot + 'pending/' + id + '/activate'),
  EDIT_ACTIVE_USER: (id) => (apiAdminRoot + 'users/active/' + id),
  CHANGE_ACTIVE_USER_STATUS: (id) => (apiAdminRoot + 'users/active/' + id + '/enabledStatus'),
  RESTORE_ARCHIVED_USER: (id) => (apiAdminRoot + 'users/archived/' + id + '/restore'),
  GET_WITHDRAWS: apiAdminRoot + 'withdraw',
  WITHDRAW_ID: (id) => (apiAdminRoot + 'withdraw/' + id),

  GET_ACTIVE_USER_ACTIVITY: (id) => (apiAdminRoot + 'users/active/' + id + '/activity'),
  GET_ACTIVE_USER_LIST: (id) => (apiAdminRoot + 'users/active/' + id + '/list'),
  GET_ARCHIVED_USER_ACTIVITY: (id) => (apiAdminRoot + 'users/archived/' + id + '/activity'),
  GET_ARCHIVED_USER_LIST: (id) => (apiAdminRoot + 'users/archived/' + id + '/list'),
}

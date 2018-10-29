//export const apiRoot = 'http://sr461.2dayhost.com/api/';
//export const apiAdminRoot = 'http://sr461.2dayhost.com/api/admin/';

// for main server
export const apiRoot = 'https://sr1075.2dayhost.com/api/';
export const apiAdminRoot = 'https://sr1075.2dayhost.com/api/admin/';

export const apiUrls = {
  LOG_IN: apiRoot + 'auth',
  GET_CATEGORIES: apiRoot + 'categories',
  GET_ACTIVE_USERS: apiAdminRoot + 'users/active',
  GET_PENDINGS: apiAdminRoot + 'pending',
  GET_PENDING: (id) => (apiAdminRoot + 'pending/' + id),
  ACTIVATE_USER: (id) => (apiAdminRoot + 'pending/' + id + '/activate'),
  EDIT_ACTIVE_USER: (id) => (apiAdminRoot + 'users/active/' + id),
}

export const toggleLogin = isLogin => ({
  type: 'TOGGLE_LOGIN',
  isLogin,
});

export const toggleEditMode = isEditMode => ({
  type: 'TOGGLE_EDIT_MODE',
  isEditMode,
});

export const toggleEditRole = isEditRole => ({
  type: 'TOGGLE_EDIT_ROLE',
  isEditRole,
});

export const updateUserData = userData => ({
  type: 'UPDATE_USER_DATA',
  userData,
});

export const loadData = data => ({
  type: 'LOAD_DATA',
  data,
});

export const insertStory = payload => ({
  type: 'INSERT_STORY',
  payload,
});

export const insertCollection = payload => ({
  type: 'INSERT_COLLECTION',
  payload,
});

export const removeStory = payload => ({
  type: 'REMOVE_STORY',
  payload,
});

export const insertEmptyStory = payload => ({
  type: 'INSERT_EMPTY_STORY',
  payload,
});

export const removeEmptyStory = payload => ({
  type: 'REMOVE_EMPTY_STORY',
  payload,
});

export const replaceStory = payload => ({
  type: 'REPLACE_STORY',
  payload,
});

export const changeLayout = payload => ({
  type: 'CHANGE_LAYOUT',
  payload,
});

export const editHeadline = payload => ({
  type: 'EDIT_HEADLINE',
  payload,
});

export const revertHeadlineEdit = payload => ({
  type: 'REVERT_HEADLINE_EDIT',
  payload,
});

export const pinStory = payload => ({
  type: 'PIN_STORY',
  payload,
});

export const unPinStory = payload => ({
  type: 'UN_PIN_STORY',
  payload,
});

export const changeModuleSource = payload => ({
  type: 'CAHNGE_MODULE_SOURCE',
  payload,
});

export const updateAuthToken = payload => ({
  type: 'UPDATE_AUTH_TOKEN',
  payload,
});

export const togglePro = proState => ({
  type: 'TOGGLE_PRO',
  proState,
});

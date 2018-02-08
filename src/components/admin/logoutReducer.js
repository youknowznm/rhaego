// import {
//   REQUEST_LOGOUT,
//   TOGGLE_LOGOUT_DIALOG,
// } from './actionTypes'
// import {createReducer} from 'redux-action-tools'

// export default createReducer()
//   .when(REQUEST_LOGOUT, (state, action) => {
//     return {
//       ...state,
//       status: 'loading',
//       adminLoggedIn: false,
//     }
//   })
//   .done((state, action) => {
//     return {
//       ...state,
//       status: 'completed',
//       adminLoggedIn: true,
//     }
//   })
//   .failed((state, action) => {
//     return {
//       ...state,
//       status: 'failed',
//       adminLoggedIn: false,
//     }
//   })
//   .build({
//     dialogOpen: false,
//     logoutResultMessage: '',
//   })
export {
  debounce,
  throttle,
  pick,
  omit,
} from 'lodash'

// export const debounce = function(fn, time = 400)  {
//   var timerId = null
//   return function(args) {
//     if (timerId) {
//       timerId = setTimeout(fn, time)
//     } else {
//       clearTimeout(timerId)
//       // fn.apply(fn, ...args)
//     }
//   }
// }
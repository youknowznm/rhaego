export default {

  login: {
    // (zhngnmng)(@sina)(.com)(.cn)
    emailReg: /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/,
    // 12345678
    passwordReg: /^.{6,20}$/,
  },

  editor: {
    titleReg: /^.{10,40}$/,
    summaryReg: /^.{10,100}$/,
    createdDateReg: /^\d{4}-\d{2}-\d{2}$/,
    contentReg: /\S/,
  },

}

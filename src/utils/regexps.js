export default {
  // (zhngnmng)(@sina)(.com)(.cn)
  emailReg: /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/,
  // 12345678
  passwordReg: /^.{6,20}$/,
  // 张三abc123
  nicknameReg: /^[a-zA-Z0-9\-\u9FA5]{2,10}$/,
}

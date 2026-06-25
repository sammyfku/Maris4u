export function validateEmail(email){
  if(!email) return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(pw){
  if(!pw || pw.length < 6) return false
  return true
}

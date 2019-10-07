export const UPDATE_USER_DATA = 'user/UPDATE_USER_DATA'

export function updadteUserData (payload) {
  return {
    type: UPDATE_USER_DATA,
    payload
  }
}

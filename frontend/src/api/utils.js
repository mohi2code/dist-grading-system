export const makeAuthorizationHeader = (jwt) => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
}
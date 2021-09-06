/**
 * Mocking login feature
 * header it can be a API call to validate login
 */
export const login = (username: string, password: string) => {
  return username.trim() === 'foo' && password.trim() === 'bar';
}
const JWT_LOCALSTORAGE_KEY = "jwt";

export function saveJWTToLocalStorage(jwt: any): any {
  localStorage.setItem(JWT_LOCALSTORAGE_KEY, jwt);
}

export function retrieveJWTFromLocalStorage(): any {
  return localStorage.getItem(JWT_LOCALSTORAGE_KEY);
}

export function forgetJWTInLocalStorage(): any {
  localStorage.removeItem(JWT_LOCALSTORAGE_KEY);
}

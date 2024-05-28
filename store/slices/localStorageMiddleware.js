const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', JSON.stringify(state.auth.isAuthenticated));
      localStorage.setItem('user', JSON.stringify(state.auth.user));
    }
  
    return result;
  };
  
  export default localStorageMiddleware;
  
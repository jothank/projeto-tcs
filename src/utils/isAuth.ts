import { useAuthContext } from "../auth/useAuthContext";

export const getToken = () => {
  const { logout, isAuthenticated, isInitialized } = useAuthContext();

  console.log('isAuthenticated', isAuthenticated);
  console.log('isInitialized', isInitialized)
  ;
    const accessToken = localStorage.getItem('accessToken');
    const id = localStorage.getItem('userID');
    
    if(!accessToken || id){
      logout()
    }
    return accessToken;
}
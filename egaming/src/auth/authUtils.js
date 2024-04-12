
export const handleLogin = async () => {
    console.log('Logged in');
    localStorage.setItem('isLoggedIn', 'true');
};
// Function for handling logout
export const handleLogout = (setIsLoggedIn) => {
    console.log('Logged out');
    localStorage.removeItem('isLoggedIn');
};
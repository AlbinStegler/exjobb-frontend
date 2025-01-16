import urlModule from './url.js';

const apiKey = process.env.REACT_APP_API_KEY;
const userModel = {
    getUsers: async function getUsers() {
        const url = urlModule.getUrl();
        try {
            const result = await fetch(`${url}/users`, {
                headers: {
                    'apiKey': apiKey
                }
            });
            return await result.json();
        } catch (error) {
            console.error('Error checking login:', error);
            return error;
        }
    },
    getUsersByEvent: async function getUsersByEvent(event) {
        const url = urlModule.getUrl();
        try {
            const encodedEvent = encodeURIComponent(event);
            const result = await fetch(`${url}/users/event/${encodedEvent}`, {
                headers: {
                    'apiKey': apiKey
                }
            });
            return await result.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            return error;
        }
    },
    createUser: async function createUser(data) {
        const url = urlModule.getUrl();

        try {
            const result = await fetch(`${url}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': apiKey
                },
                body: JSON.stringify(data)
            });
            return await result.json();
        } catch (error) {
            console.error('Error creating user:', error);
            return error;
        }
    },
    getUserFromSeat: async function getUserFromSeat(seat) {
        const url = urlModule.getUrl();
        try {
            const result = await fetch(`${url}/users/seat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': apiKey
                },
                body: JSON.stringify(seat)
            });
            return await result.json();
        } catch (error) {
            console.error('Error fetching user:', error);
            return error;
        }
    },
    deleteUser: async function deleteUser(id) {
        const url = urlModule.getUrl();

        try {
            const result = await fetch(`${url}/users/${id}`, {
                headers: {
                    'apiKey': apiKey, method: 'DELETE'
                },
                method: 'DELETE'
            }

            );
            return await result.json();
        } catch (error) {
            console.error('Error deleting user:', error);
            return error;
        }
    },
    updateUser: async function updateUser(data) {
        const url = urlModule.getUrl();

        try {
            const result = await fetch(`${url}/users`, {
                method: 'PUT',
                headers: {
                    'apiKey': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await result.json();
        } catch (error) {
            console.error('Error updating user:', error);
            return error;
        }
    },
    findByEmailorNickname: async function findByEmailorNickname(data) {
        const url = urlModule.getUrl();

        try {
            const result = await fetch(`${url}/users/EmailOrNickname`, {
                method: 'POST',
                headers: {
                    'apiKey': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await result.json();
        } catch (error) {
            console.error('Error fetching user:', error);
            return error;
        }
    }
};

export default userModel;
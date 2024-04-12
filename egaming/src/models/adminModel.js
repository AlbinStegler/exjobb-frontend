import urlModel from './url.js';
const url = urlModel.getUrl();
const apiKey = process.env.REACT_APP_API_KEY;

const adminModel = {
    checkLogin: async function checkLogin(data) {
        try {
            const result = await fetch(`${url}/admin`, {
                method: 'POST',
                headers: {
                    apiKey: apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            return await result.json();
        } catch (error) {
            console.error('Error checking login:', error);
            return error;
        }
    },
}

export default adminModel;
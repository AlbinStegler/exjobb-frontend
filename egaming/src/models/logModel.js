import urlModel from './url.js';
const url = urlModel.getUrl();
const apiKey = process.env.REACT_APP_API_KEY;

const logModel = {
    getLogsToday: async function getLogsToday() {
        try {
            const result = await fetch(`${url}/log/today`, {
                method: 'GET',
                headers: {
                    apiKey: apiKey,
                    'Content-Type': 'application/json',
                },
            });

            return await result.json();
        } catch (error) {
            console.error('Error creating log:', error);
            return error;
        }
    },
    createLog: async function (logData) {
        try {
            const result = await fetch(`${url}/log/`, {
                method: 'POST',
                headers: {
                    apiKey: apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logData),
            });

            return await result.json();
        } catch (error) {
            console.error('Error creating log:', error);
            return error;
        }
    }
}

export default logModel;
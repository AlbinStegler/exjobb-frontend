import urlModel from './url.js';
const url = urlModel.getUrl();
const apiKey = process.env.REACT_APP_API_KEY;

const eventModel = {
    getEvents: async function getEvents() {
        try {
            const data = await fetch(`${url}/event`,
                {
                    headers: {
                        'apiKey': apiKey
                    }
                });
            return data.json();
        } catch (error) {
            console.error('Error fetching event:', error);
            return error;
        }
    },
    addEvent: async function addEvent(data) {
        try {
            const result = await fetch(`${url}/event`, {
                method: 'POST',
                headers: {
                    'apiKey': apiKey,
                },
                body: JSON.stringify(data),
            });

            return await result.status;
        } catch (error) {
            console.error('Error adding event:', error);
            return error;
        }
    },
    activateEvent: async function activateEvent(data) {
        console.log(data)
        try {
            const result = await fetch(`${url}/event`, {
                method: 'PUT',
                headers: {
                    'apiKey': apiKey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await result.status;
        } catch (error) {
            console.error('Error activating event:', error);
            return error;
        }
    },
    getActiveEvent: async function getActiveEvent() {
        console.log(url)

        try {
            const data = await fetch(`${url}/event/active`, {
                headers: {
                    'apiKey': apiKey,
                }
            });
            return data.json();
        } catch (error) {
            console.error('Error fetching active event:', error);
            return error;
        }
    },
    bookSeat: async function bookSeat(data) {
        try {
            const result = await fetch(`${url}/event/book`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': apiKey,
                },
                body: JSON.stringify(data),
            });

            return await result.status;
        } catch (error) {
            console.error('Error booking seat:', error);
            return error;
        }
    },
    deleteEvent: async function deleteEvent(id) {
        try {
            const result = await fetch(`${url}/event/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': apiKey,
                },
                method: 'DELETE',
            });

            return await result.status;
        } catch (error) {
            console.error('Error deleting event:', error);
            return error;
        }
    },

}

export default eventModel;
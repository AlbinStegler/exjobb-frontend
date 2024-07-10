import urlModel from './url';
const url = urlModel.getUrl();
const apiKey = process.env.REACT_APP_API_KEY;

const sverokModel = {
    createMember: async (member) => {
        const api_key = process.env.REACT_APP_SVEROK_API_KEY;
        const body = {
            api_key: api_key,
            member
        }
        const response = await fetch(`${url}/sverok`, {
            method: 'POST',
            headers: {
                'apiKey': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        console.log(response);
        const data = await response.json();
        return data;
    },
    createMemberSPAR: async (member) => {
        const api_key = process.env.REACT_APP_SVEROK_API_KEY;
        const body = {
            api_key: api_key,
            member
        }
        const response = await fetch(`${url}/sverok/spar`, {
            method: 'POST',
            headers: {
                'apiKey': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        console.log(response);
        const data = await response.json();
        return data;
    }
}
export default sverokModel;
const url = {
    getUrl() {
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'production') {
            return 'http://16.171.10.220:1337'
        } else {
            return 'http://localhost:1337'
        }
    }
}
export default url
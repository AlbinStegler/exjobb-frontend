const url = {
    getUrl() {
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'production') {
            return 'https://51.21.54.87.nip.io'
        } else {
            return 'http://localhost:1337'
        }
    }
}
export default url
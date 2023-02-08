const prodConfig = {

    mongodb_url: "mongodb://localhost:27017/customer_data"

}

const devConfig = {

    mongodb_url: "mongodb://localhost:27017/customer_data"

}

module.exports = () => {

    switch (process.env.NODE_ENV) {
        case 'production':
            return prodConfig;

        case 'development':
            return devConfig;

        default:
            return devConfig;
    }
}
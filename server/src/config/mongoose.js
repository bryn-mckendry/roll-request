const mongoose = require('mongoose');

const connectionSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connect = (uri, connectedMessage) => {
    mongoose.connect(uri, connectionSettings);
    mongoose.connection.on('error', (error) => {
        console.log('Database error: ' + error);
    });
    mongoose.connection.on('connected', () => {
        console.log(connectedMessage);
    });
}

var configuredConnection = undefined;

if (process.env.NODE_ENV === 'development') {
    configuredConnection = () => connect(process.env.MONGODB_URI_DEV, 'Connected to database: Development')
} else if (process.env.NODE_ENV === 'testing') {
    configuredConnection = () => connect(process.env.MONGODB_URI_TESTING, 'Connected to database: Testing')
} else if (process.env.NODE_ENV === 'production') {
    configuredConnection = () => connect(process.env.NODE_ENV.PRODUCTION, 'Connected to database: Production')
}

module.exports = configuredConnection
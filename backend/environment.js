const env = process.env.NODE_ENV

const DEVELOPMENT = {
    port: 8080,
    email:{
        from: '"GENSIS | Admin" <no_reply@cflogistics.life>',
        host: "smtp-mail.outlook.com", // hostname 
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP 
        tls: {
            ciphers:'SSLv3'
        },
        auth: {
            user: "no_reply@cflogistics.life",
            pass: "CfLogisticsNoReply0824.!",
        }
    },
    jwtSecert: process.env.JWT_SECRET,
    // mongoUrl : 'mongodb+srv://hitesh8183:FxKKI5RKOFpRXzO4@cluster0.vwozt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

    // mongoUrl : 'mongodb+srv://reactcodder123:f9CikUkeDo6eM9c0@cluster0.hbztk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    mongoUrl : 'mongodb+srv://reactCodder:hP5ttOrBzMlb186q@cluster0.rkcz04q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' ,
    tempFileStoragePath : `${__dirname}/${process.env.TEMP_FILE_STORAGE}` ,
}

const PRODUCTION = {
    port: 8080,
    email:{
        from: process.env.EMAIL_FROM,
        host: process.env.EMAIL_HOST, // hostname 
        secureConnection: false, // TLS requires secureConnection to be false
        port: Number(process.env.EMAIL_SMTP_PORT), // port for secure SMTP 
        tls: {
            ciphers:'SSLv3'
        },
        transportMethod: process.env.EMAIL_TRANSPORT_METHOD, // default is SMTP. Accepts anything that nodemailer accepts 
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASSWORD,
        }
    },
    jwtSecert: process.env.JWT_SECRET,
    mongoUrl : 'mongodb+srv://hitesh8183:FxKKI5RKOFpRXzO4@cluster0.vwozt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

}



const ENVIRONMENT = {
    development: DEVELOPMENT,
    production: PRODUCTION,
};

const currentEnv = (process.env.NODE_ENV || 'development').toLowerCase();



module.exports = ENVIRONMENT[currentEnv];



const jwt = require('jsonwebtoken')
const config = require('../environment'); 
const createError = require('http-errors');


/** -- Is Used For Admin Panel Can not be use any other place-- */
isAdminTokenValid = ( req, res, next ) => {
    const token = req.body.token || req.query.token || req.params.token || req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    if( !token ) throw createError.Unauthorized('Unauthorized Access');
    try {
        const decoded = jwt.verify( token, config.jwtSecert)
        if(decoded && decoded.app !== 'admin') throw createError.Unauthorized('Unauthorized Access');
        req.userId = decoded.aud // use this
        next();
    } catch (error) {
        next(createError.Unauthorized('Session Time Out'));
    }
}

/** --------------------------------------------- Below Used For Client ----------------------------------------------- */
isUserTokenValid = ( req, res, next ) => {
    const token = req.body.token || req.query.token || req.params.token || req.headers.authorization ? req.headers.authorization.split('Bearer')[1] : null
    if( !token ) throw createError.Unauthorized('Unauthorized Access');
    try {
        const decoded = jwt.verify( token, config.jwtSecert)
        if(decoded && decoded.app !== 'client') throw createError.Unauthorized('Unauthorized Access');
        // req.body.userId = decoded.aud // don't use
        req.userId = decoded.aud // use this
        next();
    } catch (error) {
        next(createError.Unauthorized('Session Time Out'));
    }
}

const auth = { 
    isAdminTokenValid, 
    isUserTokenValid
};
module.exports = auth;
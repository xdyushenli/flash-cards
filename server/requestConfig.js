const requestConfig = {
    '/': {
        handler: 'start',
        method: 'get',
    },
    '/start': {
        handler: 'start',
        method: 'get',
    },
    '/upload': {
        handler: 'upload',
        method: 'post',
    },
    '/show': {
        handler: 'show',
        method: 'get',
    },
    '/signUp': {
        handler: 'signUp',
        method: 'post',
    }
};

module.exports = {
    requestConfig
};
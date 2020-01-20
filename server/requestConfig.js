exports.requestConfig = {
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
};
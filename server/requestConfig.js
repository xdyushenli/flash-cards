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
    },
    '/logIn': {
        handler: 'logIn',
        method: 'post',
    },
    '/createCard': {
        handler: 'createCard',
        method: 'post',
    },
    '/readCards': {
        handler: 'readCards',
        method: 'post',
    },
    '/updateCard': {
        handler: 'updateCard',
        method: 'post',
    },
    '/deleteCard': {
        handler: 'deleteCard',
        method: 'post',
    }
};

module.exports.requestConfig = requestConfig
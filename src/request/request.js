import axios from 'axios';
import '../mock/mock.js'

const baseUrl = 'https://www.mock.com';
const APIList = {
    getCards: {
        url: '/query',
        method: 'get',
    },
    addCard: {
        url: '/add',
        method: 'post',
        propsKeys: ['type', 'title', 'content'],
    },
    deleteCard: {
        url: '/delete',
        method: 'delete',
        propsKeys: ['id'],
    },
    modifyCard: {
        url: '/modify',
        method: 'post',
        propsKeys: ['id', 'title', 'content'],
    }
}

const getData = async (APIName, data = {}) => {
    if (!APIList[APIName]) {
        throw new Error('API not Found!')
    }
    
    // 检查发送的数据, 确保没有多余项和遗漏项
    if (APIList[APIName].propsKeys) {
        let propsKeys = APIList[APIName].propsKeys;
        let dataKeys = Object.keys(data);
        let missingKeys = [];

        if (propsKeys.length < dataKeys.length) {
            throw new Error('Unnecessary arguments!')
        }

        for (let propsKey of propsKeys) {
            if (!dataKeys.includes(propsKey)) {
                missingKeys.push(propsKey);
            }
        }

        if (missingKeys.length > 0) {
            throw new Error(`Arguments not completed! Missing ${missingKeys.join()}`)
        }
    }

    const { url, method } = APIList[APIName];
    const config = {
        url: `${baseUrl}${url}`,
        method,
        data,
    }

    return await axios.request(config);
}

export {
    getData,
}


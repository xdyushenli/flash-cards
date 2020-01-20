import Mock from 'mockjs';
 
export default Mock.mock('https://www.mock.com/query', {
    list: [
        {
            id: '01',
            title: 'something **something** asdf',
            content: '### something\n I like hacking!',
        },
        {
            id: '02',
            title: 'something **something** asdf',
            content: '### something\n I like hacking!',
        },
        {
            id: '03',
            title: 'something **something** asdf',
            content: '### something\n I like hacking!',
        },
        {
            id: '04',
            title: 'something **something** asdf',
            content: '### something\n I like hacking!',
        },
        {
            id: '05',
            title: 'something **something** asdf',
            content: '### something\n I like hacking!',
        },
    ]
})
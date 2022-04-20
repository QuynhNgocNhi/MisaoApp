export default {
    id: '1',
    users: [{
        id: 'u1',
        name: 'Vadim',
        imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg',
    }, {
        id: 'u2',
        name: 'Elon Musk',
        imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
    }],
    messages: [{
        id: 'm0',
        content: 'Ông gọi cho tui nghen',
        createdAt: '2020-10-10T12:48:00.000Z',
        user: {
            id: 'u1',
            name: 'Vadim',
        },
    }, {

        id: 'm1',
        content: 'okê',
        createdAt: '2020-10-10T12:48:00.000Z',
        user: {
            id: 'u1',
            name: 'Vadim',
        },
    }, {
        id: 'm2',
        content: 'Có bán nguyên vườn không',
        createdAt: '2020-10-03T14:49:00.000Z',
        user: {
            id: 'u2',
            name: 'Elon Musk',
        },
    }, {
        id: 'm3',
        content: 'Giá bao nhiêu vậy?',
        createdAt: '2020-10-03T14:49:40.000Z',
        user: {
            id: 'u2',
            name: 'Elon Musk',
        },
    }, {
        id: 'm4',
        content: 'Còn bán ông ới',
        createdAt: '2020-10-03T14:50:00.000Z',
        user: {
            id: 'u1',
            name: 'Vadim',
        },
    }, {
        id: 'm5',
        content: 'hé lô',
        createdAt: '2020-10-03T14:51:00.000Z',
        user: {
            id: 'u1',
            name: 'Vadim',
        },
    }, {
        id: 'm6',
        content: 'Ông còn bán sầu riêng không??',
        createdAt: '2020-10-03T14:49:00.000Z',
        user: {
            id: 'u2',
            name: 'Elon Musk',
        },
    }, {
        id: 'm7',
        content: 'Chào ông!',
        createdAt: '2020-10-03T14:53:00.000Z',
        user: {
            id: 'u2',
            name: 'Elon Musk',
        },
    }]
}


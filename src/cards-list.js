import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, List, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getData } from './request/request.js'

export default class CardsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
        }
    }

    componentDidMount() {
        getData('getCards')
        .then(res => {
            this.setState({
                list: res.data.list,
            })
        })
    }

    render() {
        let list = this.state.list

        return (
            <>
                <Menu mode='horizontal' style={{
                    maxWidth: '327px',
                    borderRadius: '5px',
                    margin: '20px auto',
                }}>
                    <Menu.Item>Cards</Menu.Item>
                    <Menu.Item>Generate Cards</Menu.Item>
                    <Menu.Item>Codes Cards</Menu.Item>
                </Menu>
                <List style={{
                    width: '90%',
                    margin: '0 auto',
                }}>
                    {
                        list.map((item, index) => {
                            const { id, title, content } = item;

                            return (
                                <List.Item key={index}>
                                    <Card
                                        title={<ReactMarkdown source={title} />}
                                        extra={<Link to={`edit:${id}`}>Edit</Link>}
                                        hoverable
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <ReactMarkdown source={content} />
                                    </Card>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </>
        )
    }
}
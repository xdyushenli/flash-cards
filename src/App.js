import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Form from './form.js';
import Menu from './menu.js';
import CardsList from './cards-list.js';
import Home from './home.js';
import Login from './login.js';
import './index.less';

export default class App extends React.Component {
    render() {
        const { Content, Footer, Sider } = Layout

        return (
            <Router>
                <Route path='/'>
                    <Layout style={{
                        minHeight: '100vh',
                    }}>
                        <Sider collapsible>
                            <Menu />
                        </Sider>
                        <Layout>
                            <Content>
                                <Switch>
                                    <Route path='/add'>
                                        <Form />
                                    </Route>
                                    <Route path='/edit'>
                                        <Form />
                                    </Route>
                                    <Route path='/cardslist'>
                                        <CardsList />
                                    </Route>
                                    <Route path='/'>
                                        <Home />
                                    </Route>
                                </Switch>
                            </Content>
                            <Footer style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTop: '1px solid #e8e8e8',
                            }}>
                                <p>
                                    Powerd By <a href='https://ant.design/index-cn'>Ant Design</a>
                                </p>
                            </Footer>
                        </Layout>
                    </Layout>
                </Route>
            </Router>
        );
    }
}
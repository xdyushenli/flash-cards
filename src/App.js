import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { createBrowserHistory } from 'history';
import AddCard from './add-card.js';
import Menu from './menu.js';
import CardsList from './cards-list.js';
import Home from './home.js';
import Login from './login.js';
import './index.less';
import addCard from './add-card.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: null,
        }
    }

    componentDidMount() {
        // 从 cookie 中读取用户信息
        let uid = this.__getCookieValueByName('uid');

        if (uid !== null) {
            console.log('设置 uid')
            this.setState({ uid });
        }
    }

    __getCookieValueByName(cname) {
        // 不包含对应 cookie
        if (!document.cookie.includes(cname)) {
            return null;
        }

        // 包含对应 cookie
        let cookieArr = document.cookie.split(';');
        for (let cookie of cookieArr) {
            if (cookie.includes(cname)) {
                return cookie.trim().substring(cname.length + 1);
            }
        }
    }

    __getAllCookies() {
        if (!document.cookie) {
            return {};
        }

        let cookies = {};
        let cookieArr = document.cookie.split(';');
        
        // 将所有 cookie 放入对象中
        for (let cookie of cookieArr) {
            let [cname, cvalue] = cookie.trim().split('=');

            cookies[cname] = cvalue;
        }

        return cookies;
    }

    // 登录验证
    handleLogin = (e) => {
        // 阻止 form 默认的跳转行为
        e.preventDefault();
        console.log('login 事件触发')
        console.log(e)
    }

    render() {
        const { Content, Footer, Sider } = Layout;

        return (
            <Router>
                <Route exact path='/' component={() =>
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
                                        <AddCard />
                                    </Route>
                                    <Route path='/edit'>
                                        <AddCard />
                                    </Route>
                                    <Route path='/cardslist'>
                                        <CardsList />
                                    </Route>
                                    <Route path='/home'>
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
                }
                />
                <Route path='/login' component={() => <Login onSubmit={this.handleLogin} />} />
                {
                    this.state.uid !== null ?
                        <Redirect to='/' /> :
                        <Redirect to='/login' />
                }
            </Router>
        );
    }
}
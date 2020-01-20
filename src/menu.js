import React from 'react';
import { Menu as AntdMenu, Icon } from 'antd';
import { Link } from 'react-router-dom'

export default class Menu extends React.Component {
    render() {
        return (
            <>
                <div className='logo'>
                    CS flash cards
                </div>
                <AntdMenu
                    theme='dark'
                    style={{
                        lineHeight: '64px',
                    }}
                >
                    <AntdMenu.Item>
                        <Link to='/'>
                            <Icon style={{
                                fontSize: '16px',
                            }}
                                type='home'
                            />
                            <span className='menu-text'>Home</span>
                        </Link>
                    </AntdMenu.Item>
                    <AntdMenu.Item>
                        <Link to='/add'>
                            <Icon style={{
                                fontSize: '16px',
                            }}
                                type='file-add'
                            />
                            <span className='menu-text'>Add a Card</span>
                        </Link>
                    </AntdMenu.Item>
                    <AntdMenu.Item>
                        <Link to='/cardslist'>
                            <Icon style={{
                                fontSize: '16px',
                            }}
                                type='unordered-list'
                            />
                            <span className='menu-text'>Cards List</span>
                        </Link>
                    </AntdMenu.Item>
                    <AntdMenu.Item>
                        <Link to='/logout'>
                            <Icon style={{
                                fontSize: '16px',
                            }}
                                type='export'
                            />
                            <span className='menu-text'>Log Out</span>
                        </Link>
                    </AntdMenu.Item>
                </AntdMenu>
            </>
        )
    }
}
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../store/store';

const NavBar = () => {
    const { activityStore } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" exact name="Activities" />
                <Menu.Item><Button as={NavLink} to="/createActivity" exact positive content="Create Activity" /></Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar;
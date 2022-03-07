import * as React from 'react';

import {Container} from '@material-ui/core';

import {DirectError} from './components/DirectError';

import {Menu} from './components/Menu';

import './styles/_styles.scss';

export const PAGES = {
    DirectError: 1,
};

export class App extends React.Component {

    state = {
        openPage: 0,
        error: false,
    };

    /**
     * @returns {JSX.Element}
     */
    detectPage = () => {
        const {openPage} = this.state;
        switch (openPage) {
            case PAGES.DirectError:
                return <DirectError onExit={() => this.setState({openPage: 0})}/>;
            default:
                return (
                    <Menu
                        onClick={(menuId) => {
                            if (PAGES.hasOwnProperty(menuId)) {
                                this.setState({openPage: PAGES[menuId]});
                            }
                        }}
                    />
                );
        }
    };

    render() {
        const {openPage} = this.state;
        return (
            <div className="main">
                <Container maxWidth="md">
                    {this.detectPage()}
                </Container>
            </div>
        );
    }
}
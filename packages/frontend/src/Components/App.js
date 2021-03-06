import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import Header from "./layout/Header";
import Nav from "./Nav";
import Home from "./Home";
import MemberList from "./admin/MemberList";
import Welcome from "./Welcome";
import WelcomeComplete from "./WelcomeComplete";

const Wrapper = styled.div`
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    text-align: center;
`;

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <div id='wrap'>
                        {/* 헤더 */}
                        <Header />
                        <Wrapper>
                            <GlobalStyle />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route
                                    path='/admin/member'
                                    component={MemberList}
                                />
                                <Route
                                    path='/join/welcome/complete'
                                    component={WelcomeComplete}
                                />
                                <Route
                                    path='/join/welcome/:email'
                                    component={Welcome}
                                />
                            </Switch>
                        </Wrapper>
                        <Nav />
                    </div>
                </Fragment>
            </Router>
        );
    }
}

export default App;

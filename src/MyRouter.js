import React from 'react';
import './assert/index.css';
import * as Router from 'react-router-dom';
import {Icon, NavBar, SearchBar} from "antd-mobile";
import NovelList from "./page/NovelList";
import NovelDetail from "./page/NovelDetail";
import NovelChapter from "./page/NovelChapter";

class MyRouter extends React.Component {

    componentWillMount() {
        this.setState({
            showSearch: false,
            searchValue: this.getSearchValueDecode()
        });
    }

    getSearchValueDecode() {

        if (window.location.href && window.location.href.split("=")[1]) {
            return decodeURI(window.location.href.split("=")[1]);
        }
        return null;
    }


    render() {
        return (<Router.HashRouter>
            <NavBar mode="dark"
                    leftContent="首页"
                    onLeftClick={() => window.location.href = "#/"}
                    rightContent={[
                        <Icon key="0" type="search" style={{marginRight: '16px'}} onClick={() => {
                            this.setState({showSearch: !this.state.showSearch})
                        }}/>,
                    ]}>ReaMov</NavBar>
            {this.state.showSearch ?
                <SearchBar
                    value={this.state.searchValue}
                    placeholder="Search"
                    onSubmit={value => {
                        console.log('onSubmit' + this.state.system);
                        console.log('onSubmit' + value);
                        window.location.href = `#/novel?searchValue=${encodeURI(value)}`;
                        window.location.reload();
                    }}
                    showCancelButton
                    onChange={value => {
                        this.setState({
                            searchValue: value
                        })
                    }
                    }/>
                : null}

            <Router.Switch>
                <Router.Route exact path="/novel/:page" component={NovelList}/>
                <Router.Route exact path="/novel" component={NovelList}/>
                <Router.Route exact path="/novel/detail/:id" component={NovelDetail}/>
                <Router.Route exact path="/novel/chapter/:novelId/:novelIndex" component={NovelChapter}/>
            </Router.Switch>
        </Router.HashRouter>);
    }
}

export default MyRouter;

import React from 'react';
import '../assert/App.css';
import '../assert/NovelList.css';
import 'antd-mobile/dist/antd-mobile.css';
import {List, Card} from 'antd-mobile';
import {Pagination} from 'antd';
import 'antd/dist/antd.css';
import {novelDownload, rrNovelList, search} from '../store/store';
import {pageSize, serverRealmName} from "../const";

const Item = List.Item;

class NovelList extends React.Component {


    componentWillMount() {
        const currentPage = this.props.match.params && this.props.match.params.page
            ? this.props.match.params.page : 1;
        this.setState({
            page: currentPage,
            searchValue: null,
            novelListData: {
                count: 1,
                currentPage: 1,
                novels: []
            }
        });

        this.getData(currentPage, this.getSearchValue());

    }


    getData(currentPage, searchValue) {
        search(currentPage, pageSize, searchValue, "novel")
            .then(data => {
                if (data) {
                    console.log(data)
                    this.setState({
                        novelListData: {
                            count: data.count,
                            currentPage: data.currentPage,
                            novels: data.result.map(item => JSON.parse(item))
                        }
                    });
                }

            }).catch(err => console.log(err));


    }

    getSearchValue() {
        console.log(window.location)
        if (window.location.href) {
            return window.location.href.split("=")[1];
        }
        return null;
    }

    render() {
        let dataSource;
        dataSource = this.state.novelListData.novels.map(item => (
            <Item key={item.id} onClick={() => this.props.history.push("/novel/detail/" + item.id)}>
                <Card>
                    <Card.Header
                        title={item.name}
                        extra={<span>类型:{item.classify}</span>}
                    />
                    <Card.Body>
                        <div className="liseDesc">{item.desc}</div>
                    </Card.Body>
                    <Card.Footer content={<div>大小:{item.size / 1000}KB</div>}/>
                </Card>
            </Item>
        ));


        return (
            <div className="App">
                <List>
                    {dataSource}
                </List>

                <Pagination simple total={this.state.novelListData.count}
                            pageSize={pageSize}
                            current={this.state.novelListData.currentPage}
                            style={{marginTop: 20, marginBottom: 20}}
                            onChange={number => {
                                const searchValue = this.getSearchValue();
                                this.getData(number, searchValue);
                                if (searchValue && searchValue !== '') {
                                    this.props.history.push(`/novel/${number}?searchValue=${searchValue}`);
                                } else {
                                    this.props.history.push("/novel/" + number);
                                }
                            }}
                />
            </div>
        );
    }
}

export default NovelList;

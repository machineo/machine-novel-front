import React from 'react';
import '../assert/App.css';
import '../assert/NovelChapter.css';
import 'antd-mobile/dist/antd-mobile.css';
import {List} from 'antd-mobile';
import {getNovelChapter} from '../store/store';
import {Pagination} from "antd";
import 'antd/dist/antd.css';

class NovelChapter extends React.Component {


    componentWillMount() {
        const novelIndex = this.props.match.params.novelIndex;
        const novelId = this.props.match.params.novelId;
        this.setState({
            data: {
                sum: 0,
                chapter: {}
            }
        });
        getNovelChapter(novelId, novelIndex).then(data => {
            this.setState({
                data: data
            });
        })
    }

    render() {

        return (
            <div className="App" style={{backgroundColor: "#efdbbc"}}>
                <div className="chapterContent" dangerouslySetInnerHTML={{__html: this.state.data.chapter.content}}/>

                <Pagination simple total={this.state.data.sum}
                            pageSize={1}
                            current={this.state.data.chapter.novelIndex + 1}
                            style={{marginTop: 20, marginBottom: 20,backgroundColor: "#efdbbc"}}
                            onChange={number => {
                                this.props.history.push("/novel/chapter/" +
                                    this.state.data.chapter.novelId + "/" + (number - 1));
                                this.props.history.go();
                                document.body.scrollTop = 0;
                            }}
                />
            </div>
        );
    }
}

export default NovelChapter;

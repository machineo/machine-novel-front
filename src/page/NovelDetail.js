import React from 'react';
import '../assert/App.css';
import '../assert/NovelDetail.css';
import 'antd-mobile/dist/antd-mobile.css';
import {List, Card, Grid} from 'antd-mobile';
import {getNovelDetail} from '../store/store';

const Item = List.Item;

class NovelDetail extends React.Component {


    componentWillMount() {
        const id = this.props.match.params.id;
        this.setState({
            detail: {
                novel: {},
                chapters: []
            }
        });
        getNovelDetail(id).then(data => {
            this.setState({
                detail: data
            });
        })
    }

    render() {
        console.log(this.state.detail)
        let novel = this.state.detail.novel;
        let data1 = this.state.detail.chapters.map(chapter => ({
            text: <div
                onClick={() => this.props.history.push("/novel/chapter/" + chapter.novelId + "/" + chapter.novelIndex)}>{chapter.title}</div>
        }));
        return (
            <div className="App">
                <Item key={novel.id}>
                    <Card>
                        <Card.Header
                            title={novel.name}
                            extra={<span>类型:{novel.classify}</span>}
                        />
                        <Card.Body>
                            <div className="liseDesc">{novel.desc}</div>
                        </Card.Body>
                        <Card.Footer content={<div>大小:{novel.size / 1000}KB</div>}/>
                    </Card>
                </Item>
                <Grid data={data1} columnNum={3} itemStyle={{height: '50px', fontSize: '1px !important'}}/>
            </div>
        );
    }
}

export default NovelDetail;

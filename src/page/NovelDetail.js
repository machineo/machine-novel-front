import React from 'react';
import '../assert/App.css';
import '../assert/NovelDetail.css';
import '../assert/NovelList.css';
import 'antd-mobile/dist/antd-mobile.css';
import {List, Card, Grid} from 'antd-mobile';
import {getNovelDetail} from '../store/store';

const Item = List.Item;

class NovelDetail extends React.Component {


    componentWillMount() {
        const id = this.props.match.params.id;
        this.setState({
                description: "",
                image: "",
                novelId: 0,
                title: "",
                chapterSortDtos: []
            }
        );
        getNovelDetail(id).then(data => {
            this.setState({
                description: data.description,
                image: data.image,
                novelId: data.novelId,
                title: data.title,
                chapterSortDtos: data.chapterSortDtos
            });
        })
    }

    render() {
        console.log(this.state.detail)
        const novelId = this.state.novelId;
        let data1 = this.state.chapterSortDtos.map(chapter => ({
            text: <div
                onClick={() => this.props.history.push("/novel/chapter/" + novelId + "/" + chapter.sort)}>{chapter.chapterTitle}</div>
        }));
        return (
            <div className="App">
                <Item key={novelId}>
                    <Card>
                        <Card.Body>
                            <div className="cardContent">
                                <img className="listImage" src={this.state.image} />
                                <div className="cardContentBottom">
                                    <div className="listTitle">{this.state.title}</div>
                                    <div className="listDesc">{this.state.description}</div>
                                </div>

                            </div>

                        </Card.Body>
                    </Card>
                </Item>
                <Grid data={data1} columnNum={3} itemStyle={{height: '50px', fontSize: '1px !important'}}/>
            </div>
        );
    }
}

export default NovelDetail;

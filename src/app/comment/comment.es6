
import $ from 'jquery';
import Markdown from 'react-remarkable';

import data from '../../api/data';

let React = require('react'),
    ReactDOM = require('react-dom');

// commentBox
let CommentBox = React.createClass({
    // getInitialState: () => {
    //     return {data: []};
    // },
    getData: function() {
        console.log(data);
        this.setState({
            data: data
        })
    },
    handleCommentSubmit: function(comment) {
        console.log(comment);
        let pushData = {
            author: comment.author,
            txt: comment.txt
        };
        pushData.id = data.length + 1;
        data.push(pushData);
        console.log(data);
        this.setState({
            data: data
        });
    },

    handleCommentDelete: function(id) {
        console.log(id);
        for (let i of data) {
            if (i.id === id) {
                let index = data.indexOf(i);
                data.splice(index, 1);
                this.setState({data: data});
            }
        }
    },

    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.getData();
        // setInterval(this.getData, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Hello world! I am a commentBox</h1>
                <CommentList data={this.state.data} onCommentDelete={this.handleCommentDelete}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        )
    }
})

// CommenList
let CommentList = React.createClass({
    getInitialState: function() {
        return {
            data: this.props.data
        }
    },

    handleDelete: function(comment) {
        let author = comment.author;
        let txt = comment.txt;
        let id = comment.id;
        this.props.onCommentDelete(id);
    },
    render: function() {
        let commentNodes = this.props.data.map((comment) => {
            return (
                <Comment author={comment.author} key={comment.id}>
                    <Markdown>{comment.txt}</Markdown> 
                    <div className="delete-btn"
                        onClick={(e)=>{
                            this.handleDelete(comment)
                        }}>X</div>
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        )
    }
})

// CommenForm
let CommentForm = React.createClass({
    getInitialState: function(e) {
        return {
            author: '',
            txt: ''
        }
    },
    handleAuthorChange: function(e) {
        this.setState({
            author: e.target.value
        })
    },
    handleTxtChange: function(e) {
        this.setState({
            txt: e.target.value
        })
    },
    handleSubmit: function(e) {
        e.preventDefault();
        console.log(data);
        let author = this.state.author.trim();
        let comment = this.state.txt.trim();
        if(!author || !comment) {
            // console.log('noting to submit');
            alert('noting to submit');
            return false;
        }
        this.props.onCommentSubmit({author: author, txt: comment});
        this.state.author = '';
        this.state.txt = '';
        // let pushData = {
        //     author: author,
        //     txt: comment
        // };
        // pushData.id = data.length + 1;
        // data.push(pushData);
        // console.log(data);
    },
    render: function() {
        return (
            <div className="form">
                <h1>CommentForm: for add a comment</h1>
                <div className="form-group">
                    <label className="label-controle">name:</label>
                    <input type="text" 
                        className="form-controle" 
                        value={this.state.author}
                        placeholder="type your name here"
                        onChange={this.handleAuthorChange} />
                </div>
                <div className="form-group">
                    <label className="label-controle">comment:</label>
                    <input type="text" 
                        className="form-controle" 
                        value={this.state.txt}
                        placeholder="type your comment here"
                        onChange={this.handleTxtChange} />
                </div>
                <div className="submit-btn"
                    onClick={this.handleSubmit}>提交</div>
            </div>
        )
    }
});

// Commen  
let Comment = React.createClass({
    handleMousEnter: function(e) {
        let $el = $(e.target);
        if ($el != $('.comment')) {
            $el = $el.parents('.comment');
        }
        $el.addClass('hover');
        // e.preventDefault();
        // console.log('hover')
        // console.log(e.target);
        // $(e.target).addClass('hover');
    },
    handleMousLeave: function(e) {
        let $el = $(e.target);
        if ($el != $('.comment')) {
            $el = $el.parents('.comment');
        }
        $el.removeClass('hover');
    },
    render: function() {
        return (
            <div className="comment" 
                onMouseEnter={this.handleMousEnter}
                onMouseLeave={this.handleMousLeave}>
                <h2 className="commenAuthor">
                    {this.props.author}
                </h2>
                <Markdown>{this.props.children}</Markdown>
            </div>
        )
    }
});

ReactDOM.render(
  // <h1>Hello, world!</h1>,
  <CommentBox data={data} pollInterval={2000}/>,
  document.getElementById('main')
);

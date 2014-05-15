/** @jsx React.DOM */

React.renderComponent(
    <CommentBox url="//localhost:3000/comments" pollInterval={10000} />,
    document.querySelector('.container')
);
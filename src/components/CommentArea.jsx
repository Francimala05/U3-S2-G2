import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'
import PropTypes from 'prop-types'

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: false,
    isError: false,
  }


  componentDidUpdate = async (prevProps) => {
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        isLoading: true,
      })
      try {
        let response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' +
            this.props.asin,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Nzc1ZTA2ZmM4YzAwMTU2Yjg3MDkiLCJpYXQiOjE3MzI4MDIzOTgsImV4cCI6MTczNDAxMTk5OH0.MxeUyEa3emk28WD_XhePYo2DMzDfRD33G3PybetaXLg',
            },
          }
        )
        console.log(response)
        if (response.ok) {
          let comments = await response.json()
          this.setState({
            comments: comments,
            isLoading: false,
            isError: false,
          })
        } else {
          this.setState({ isLoading: false, isError: true })
        }
      } catch (error) {
        console.log(error)
        this.setState({ isLoading: false, isError: true })
      }
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    )
  }

}

CommentArea.propTypes = {
  asin: PropTypes.string.isRequired,
};

export default CommentArea

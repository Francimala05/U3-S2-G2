import { ListGroup } from 'react-bootstrap'
import SingleComment from './SingleComment'
import PropTypes from 'prop-types'

const CommentList = ({commentsToShow}) => (
  <ListGroup style={{ color: 'black' }} className="mt-2">
    {commentsToShow.map((comment) => (
      <SingleComment comment={comment} key={comment._id} />
    ))}
  </ListGroup>
)
CommentList.propTypes = {
  commentsToShow: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default CommentList; 

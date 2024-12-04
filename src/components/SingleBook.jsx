
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'

const SingleBook = (selectedBook, book, changeSelectedBook) => {


    return (
      <>
        <Card
         
          style={{
            border:
              selectedBook === book.asin
                ? '3px solid red'
                : 'none',
          }}
        >
          <Card.Img variant="top" src={book.img}  onClick={() => changeSelectedBook(book.asin)} />
          <Card.Body>
            <Card.Title style={{ color: 'black' }}>
              {book.title}
            </Card.Title>
          </Card.Body>
        </Card>
        
      </>
    )
  }

SingleBook.propTypes = {
  book: PropTypes.shape({
    asin: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedBook: PropTypes.string.isRequired,
  changeSelectedBook: PropTypes.func.isRequired,
};

export default SingleBook

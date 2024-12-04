import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'
import PropTypes from 'prop-types'

const CommentArea = ({asin}) => {

  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

const getComment =  async () => {
  setIsLoading(true)
  try {
    let response = await fetch(
      'https://striveschool-api.herokuapp.com/api/comments/' +
        asin,
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4Nzc1ZTA2ZmM4YzAwMTU2Yjg3MDkiLCJpYXQiOjE3MzI4MDIzOTgsImV4cCI6MTczNDAxMTk5OH0.MxeUyEa3emk28WD_XhePYo2DMzDfRD33G3PybetaXLg',
        },
      }
    )
    console.log(response)
    if (response.ok) {
      let comments = await response.json()
      setComments(comments)
      setIsLoading(false)
      setIsError(false)
 
    } else {
      throw new Error("Fetch fallita")
    }
  } catch (error) {
    console.log (error) 
    setIsLoading(false)
    setIsError(true)
  }
}
  useEffect(() =>{
    console.log("comment area useEffect")
    if(asin){

   
    getComment();
  }
  },[asin])


    return (
      <div className="text-center">
        {isLoading && <Loading />}
        {isError && <Error />}
        {asin && ( 
               <>
              
        <AddComment asin={asin} />
        <CommentList commentsToShow={comments} />
       </> 
) }
      </div>
    )
  }



CommentArea.propTypes = {
  asin: PropTypes.string.isRequired,
};

export default CommentArea

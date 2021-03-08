import styled from "styled-components";
import PropTypes from "prop-types";
import Comment from "./Comment";
import { useForm } from "react-hook-form";

const CommentsContainer = styled.div`
  margin-top: 20px;
  margin-left: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

const Comments = ({ author, caption, commentNumber, comments }) => {
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {};
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            name="payload"
            ref={register({
              required: true,
            })}
            type="text"
            placehold="Write a comment"
          />
        </form>
      </div>
    </CommentsContainer>
  );
};

Comments.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string,
  commentNumber: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;

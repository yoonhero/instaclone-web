import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div`
  margin-bottom: 10px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

const Comment = ({ author, payload }) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;

import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  min-width: 615px;
  max-width: 615px;
  @media only screen and (max-width: 615px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div``;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin: 0 15px 15px 15px;
  display: block;
`;

const Photo = ({ id, user, file, isLiked, likes }) => {
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      </PhotoData>
    </PhotoContainer>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
};

export default Photo;
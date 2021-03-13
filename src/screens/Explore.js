import { gql, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      likes
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
      isLiked
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 0px;
  margin-top: 50px;
  @media only screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0px;
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0px;
  }
`;
const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const Explore = () => {
  const { data, loading } = useQuery(FEED_QUERY);
  data?.seeFeed?.map((data) => {
    console.log(data.file, data.likes);
  });
  return (
    <div>
      <PageTitle title="Explore" />
      <Grid>
        {loading ? (
          <LoadingSpinner />
        ) : (
          data?.seeFeed?.map((data) => (
            <Photo key={data.id} bg={data?.file}>
              <Icons>
                <Icon>
                  <FontAwesomeIcon icon={faHeart} />
                  {data?.likes}
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faComment} />
                  {data?.commentNumber}
                </Icon>
              </Icons>
            </Photo>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Explore;

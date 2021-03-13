import { gql, useQuery } from "@apollo/client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Photo from "../components/feed/Photo";
import { LoadingSpinner } from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";

export const FEED_QUERY = gql`
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

const Home = () => {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <div>
      <PageTitle title="" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        data?.seeFeed?.map((photo) => <Photo key={photo.id} {...photo} />)
      )}
    </div>
  );
};

export default Home;

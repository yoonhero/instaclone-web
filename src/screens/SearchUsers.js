import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { LoadingSpinner } from "../components/LoadingSpinner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
const SEARCH_USER_QUERY = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      id
      username
      avatar
    }
  }
`;
const SEARCH_PHOTO_QUERY = gql`
  query searhPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      user {
        username
      }
      file
      caption
      likes
      commentNumber
    }
  }
`;

const SearchUserContainer = styled.div`
  display: flex;
  max-width: 100vw;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(5, 1fr);

  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const SearchUser = styled.div`
  border-radius: 10px;
  padding: 20px 10px;
  background: #f3f1ef;
  align-items: center;
  text-align: center;
  justify-content: center;
  img {
    background-color: #bfbfbf;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  h1 {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 400;
    color: rgb(142, 142, 142);
  }
`;

const Container = styled.div`
  width: 100vw;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
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
const SearchUsers = () => {
  const { keyword } = useParams();
  const { data, loading } = useQuery(SEARCH_USER_QUERY, {
    variables: {
      keyword,
    },
  });
  const { data: photos, loading: photoLoading } = useQuery(SEARCH_PHOTO_QUERY, {
    variables: {
      keyword,
    },
  });
  console.log(photos);
  return (
    <div>
      {!loading ? (
        <Container>
          <SearchUserContainer>
            {loading
              ? ""
              : data?.searchUsers.map((user) => (
                  <SearchUser key={user?.id}>
                    <Link to={`/users/${user.username}`}>
                      <img src={user?.avatar} />
                    </Link>

                    <Link to={`/users/${user.username}`}>
                      <h1>{user?.username}</h1>
                    </Link>
                  </SearchUser>
                ))}
          </SearchUserContainer>
          <Grid>
            {photos?.searchPhotos?.map((photo) => (
              <Photo key={photo.id} bg={photo.file}>
                <Icons>
                  <Icon>
                    <FontAwesomeIcon icon={faHeart} />
                    {photo.likes}
                  </Icon>
                  <Icon>
                    <FontAwesomeIcon icon={faComment} />
                    {photo.commentNumber}
                  </Icon>
                </Icons>
              </Photo>
            ))}
          </Grid>
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default SearchUsers;

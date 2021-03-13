import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { LoadingSpinner } from "../components/LoadingSpinner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import Users from "../components/Users";

const SEARCH_USER_QUERY = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      id
      username
      avatar
      bio
      isFollowing
      isMe
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 0;
`;

const Container = styled.div``;
const SearchUsers = () => {
  const { keyword } = useParams();
  const { data, loading } = useQuery(SEARCH_USER_QUERY, {
    variables: {
      keyword,
    },
  });

  return (
    <>
      {!loading ? (
        <Container>
          <SearchUserContainer>
            {loading
              ? ""
              : data?.searchUsers.map((user) => <Users user={user} />)}
          </SearchUserContainer>
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default SearchUsers;

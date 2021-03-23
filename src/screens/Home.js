import { gql, useQuery } from "@apollo/client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Photo from "../components/feed/Photo";
import { LoadingSpinner } from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";

export const FEED_QUERY = gql`
  query seeFeed($offset: Int!, $limit: Int!) {
    seeFeed(offset: $offset, limit: $limit) {
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
  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state
  const [allData, setAllData] = useState([]);
  const { data, loading, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
      limit: 2,
    },
  });

  const fetchMoreInstaFeeds = async () => {
    setFetching(true);
    let offset = 0;
    if (allData.length === 0) {
      offset = Math.floor(data?.seeFeed?.length);
    } else {
      offset =
        Math.floor(data?.seeFeed?.length) +
        Math.floor(allData?.seeFeed?.length);
    }
    if (data !== null && data !== undefined) {
      let { data: newData } = await fetchMore({
        variables: {
          offset,
          limit: 2,
        },
      });
      console.log(newData);
      newData?.seeFeed.concat(allData?.data?.seeFeed);
      setAllData(newData.data);
    }

    setFetching(false);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      console.log("Reach");
      fetchMoreInstaFeeds();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  return (
    <div>
      <PageTitle title="" />
      {loading ? (
        <LoadingSpinner />
      ) : (
        data?.seeFeed?.map((photo) => <Photo key={photo.id} {...photo} />)
      )}
      {allData !== null
        ? allData?.seeFeed?.map((photo) => <Photo key={photo.id} {...photo} />)
        : null}
    </div>
  );
};

export default Home;

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import { LoadingSpinner } from "../components/LoadingSpinner";
import styled from "styled-components";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String!) {
    uploadPhoto(file: $file, caption: $caption) {
      id
    }
  }
`;

const UploadPhotoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 200px;
    &:hover {
      background-color: #eeeeee;
    }
  }
`;

const TextArea = styled.textarea`
  margin-top: 2rem;
  height: 4rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.4em;
  padding: 5px 8px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const UploadPhoto = () => {
  const location = useLocation();
  const history = useHistory();
  const [imgUrl, setImageUrl] = useState("");
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  });
  const onCompleted = () => {
    history.push(`/`, {
      image: "",
    });
  };
  const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO_MUTATION, {
    onCompleted,
  });
  if (location?.state?.image) {
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImageUrl(result);
    };
    reader.readAsDataURL(location?.state?.image);
  }
  const onSubmitValid = async () => {
    if (loading) {
      return;
    }
    const { caption } = getValues();
    uploadPhoto({
      variables: {
        file: location?.state?.image,
        caption,
      },
    });
  };
  return (
    <>
      {!loading ? (
        <UploadPhotoContainer>
          {location?.state?.image ? (
            <label for="uploadImg">
              <img src={imgUrl} />
            </label>
          ) : null}
          <form onSubmit={handleSubmit(onSubmitValid)}>
            {location?.state?.image ? (
              <>
                <TextArea
                  type="text"
                  name="caption"
                  ref={register({
                    required: true,
                  })}
                  placeholder={"문구 입력"}
                />
                <Button
                  type="submit"
                  value={loading ? "Loading..." : "공유하기"}
                  disabled={!formState.isValid || loading}
                />
              </>
            ) : null}
          </form>
        </UploadPhotoContainer>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default UploadPhoto;

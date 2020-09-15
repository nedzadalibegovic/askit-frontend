import React, { useContext, useEffect, useState } from "react";
import { Media } from "react-bootstrap";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";

import styles from "./ratings.module.css";
import { AuthContext } from "../../contexts/auth";

const Ratings = ({
  likes,
  dislikes,
  questionId,
  userId = null,
  type = "answer",
  ratings,
}) => {
  const { token, apiCall } = useContext(AuthContext);

  const [likeCount, setLikeCount] = useState();
  const [dislikeCount, setDislikeCount] = useState();
  const [rated, setRated] = useState();
  const [liked, setLiked] = useState();

  useEffect(() => {
    if (likes || likes === 0) setLikeCount(likes);
    if (dislikes || dislikes === 0) setDislikeCount(dislikes);
    if (ratings && ratings?.length > 0) {
      setRated(true);
      setLiked(ratings[0].Rating === "Like");
    }
  }, [ratings, likes, dislikes]);

  const sendRating = async (rating) => {
    const response = await apiCall("/ratings", type, "", "POST", {
      QuestionID: questionId,
      UserID: userId,
      Rating: rating,
    });
    const json = await response.json();

    if (response.ok) {
      setRated(true);

      if (json.Rating === "Like") {
        setLikeCount(likeCount + 1);
        setLiked(true);
      } else {
        setDislikeCount(dislikeCount + 1);
        setLiked(false);
      }
    }
  };

  const deleteRating = async () => {
    const response = await apiCall("/ratings", type, "", "DELETE", {
      QuestionID: questionId,
      UserID: userId,
    });

    if (response.ok) {
      setRated(false);

      if (liked === true) {
        setLikeCount(likeCount - 1);
      } else {
        setDislikeCount(dislikeCount - 1);
      }

      setLiked(false);
    }
  };

  return (
    <Media>
      <Media.Body>
        <HandThumbsUp
          onClick={() => {
            if (token && !rated) sendRating("Like");
            if (token && rated && liked) deleteRating();
          }}
          className={token && rated && liked ? "text-success" : ""}
          style={token ? { cursor: "pointer" } : {}}
        />
        <p
          style={{ display: "inline", padding: "2px" }}
          className={token && rated && liked ? "text-success" : ""}
        >
          {likeCount}
        </p>

        <HandThumbsDown
          onClick={() => {
            if (token && !rated) sendRating("Dislike");
            if (token && rated && !liked) deleteRating();
          }}
          className={token && rated && !liked ? "text-danger" : ""}
          style={token ? { cursor: "pointer" } : {}}
        />
        <p
          style={{ display: "inline", padding: "2px" }}
          className={token && rated && !liked ? "text-danger" : ""}
        >
          {dislikeCount}
        </p>
      </Media.Body>
    </Media>
  );
};

export default Ratings;

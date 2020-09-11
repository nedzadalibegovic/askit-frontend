import React from "react";
import { Media } from "react-bootstrap";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";

import styles from "./ratings.module.css";

const Ratings = ({ likes, dislikes }) => {
  return (
    <Media>
      <Media.Body>
        <HandThumbsUp />
        <p className={styles.text}>{likes}</p>

        <HandThumbsDown />
        <p className={styles.text}>{dislikes}</p>
      </Media.Body>
    </Media>
  );
};

export default Ratings;

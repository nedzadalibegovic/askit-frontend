import React from "react";
import { Pagination } from "react-bootstrap";

// total - corresponds to the total number of records
// page - corresponds to currently active page (needs to be a state variable)
// func - should be a data-fetching function that also manipulates the page param
const LoadMore = ({ total, page, func }) => {
  const size = 20;
  const max = Math.ceil(total / size);

  const items = [];
  for (let i = 1; i <= max; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === page}
        onClick={() => {
          func(i);
        }}
      >
        {i}
      </Pagination.Item>
    );
  }

  return <Pagination size="sm">{items}</Pagination>;
};

export default LoadMore;

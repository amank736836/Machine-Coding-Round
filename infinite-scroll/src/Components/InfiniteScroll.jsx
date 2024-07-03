import React, { useEffect } from "react";
import Post from "./Post";

function InfiniteScroll({data, setData}) {
  const [pageNo, setPageNo] = React.useState(1);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`)
        .then((response) => response.json())
        .then((data) => {
            setData((prevData) => [...prevData, ...data]);
        });
    }, [pageNo , setData]);

  return <Post data={data} setPageNo={setPageNo} />;
}

export default InfiniteScroll;

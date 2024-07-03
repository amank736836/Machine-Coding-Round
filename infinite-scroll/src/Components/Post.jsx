import React, { useEffect } from "react";

function Post({ data, setPageNo }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log(entries);
        if (entries[0].isIntersecting) {
          observer.unobserve(entries[0].target);
          setPageNo((prevPageNo) => prevPageNo + 1);
        }
      },
      { threshold: 0.6 }
    );

    const lastImage = document.querySelector(".post-image:last-child");
    // console.log(lastImage);
    if (!lastImage) {
        return;
    }
    observer.observe(lastImage);

    return () => {
        if (lastImage) observer.unobserve(lastImage);
        observer.disconnect();   
    }
  }, [data , setPageNo]);

  return (
    <div className="container">
      {data.map((post) => (
          <img
            key={post.id}
            src={post.download_url}
            alt={post.author}
            className="post-image"
          />
      ))}
    </div>
  );
}

export default Post;

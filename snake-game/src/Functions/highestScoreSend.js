const highestScoreSend = async ({ user, score }) => {
  const data = fetch(
    "https://machine-coding-round-bsrq.onrender.com/snakeGame",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user,
        score: score,
      }),
    }
  ).then((response) => {
    console.log(response);
    console.log(response.json());
    console.log("Data sent");
  });
};

export default highestScoreSend;

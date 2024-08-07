const highestScoreSend = async ({ user, score }) => {
  console.log("Highest Score Send");
  console.log(user);
  console.log(score);
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
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export default highestScoreSend;

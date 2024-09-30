import React from "react";

const QnA = ({ faq, handleToggle, showFaq }) => {
  return (
    <div className="qna">
      {faq.question}
      <span onClick={handleToggle} className="toggle">
        {showFaq ? "➖" : "➕"}
      </span>

      {showFaq && (
        <div>
          <hr />
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default QnA;

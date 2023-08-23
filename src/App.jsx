import { useState } from "react";
import questions from "./data/Questions.json";
import { getSelected, getScore } from "./utils/QuizFunction";
import { CSVLink } from "react-csv";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Confetti from "react-confetti";

const App = () => {
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(0);
  const [nextButton, setNextButton] = useState(false);
  const [nextButtonText, setNextButtonText] = useState("Next Question");
  const [quiz, setQuiz] = useState(true);
  let question = questions[count];
  let percentage = ((getScore(selected) / questions.length) * 100).toFixed(0);
  let headers = [
    { label: "id", key: "qId" },
    { label: "Image", key: "image" },
    { label: "Answer", key: "answer" },
    { label: "You Selected", key: "op" },
  ];

  const handleSelectedOption = (question, op) => {
    let findOption = selected.find((elem) => elem.qId === question.id);
    if (findOption) {
      findOption.op = op;
      setSelected([...selected]);
    } else {
      setSelected([
        ...selected,
        {
          qId: question.id,
          image: question.image,
          answer: question.answer,
          op: op,
        },
      ]);
    }

    setNextButton(true);
  };

  const showNextQuestion = () => {
    if (count < questions.length - 1) {
      setNextButton(false);
      if (count === questions.length - 2) {
        setNextButtonText("Submit");
      }
      if (count < questions.length - 1) {
        let newCount = count + 1;
        setCount(newCount);
      }
    } else {
      setQuiz(false);
    }
  };

  // console.log(questions);
  return (
    <>
      <div className="container">
        <div className="row div-center">
          <div className="col-md-8 mx-auto">
            {quiz ? (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">
                    Guess the Language! Quiz
                    <span className="float-end">
                      <b>
                        {count + 1} of {questions.length}
                      </b>
                    </span>
                  </h5>

                  <img
                    src={question.image}
                    className="question-image d-block mx-auto"
                    alt="Image"
                  />
                </div>
                <div className="row align-items-center justify-content-center gap-3 mb-5">
                  {question.options.map((op) => (
                    <div key={op} className="col-md-4 col-sm-12">
                      <button
                        className={getSelected(question.id, op, selected)}
                        type="button"
                        onClick={() => handleSelectedOption(question, op)}
                      >
                        {op}
                      </button>
                    </div>
                  ))}
                </div>

                {nextButton ? (
                  <div className="text-center">
                    <button
                      className="btn btn-custom-blue mt-4 py-2 text"
                      onClick={showNextQuestion}
                    >
                      {nextButtonText}
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="card-body">
                <Confetti  width="2000" height="800" numberOfPieces="1000" recycle={false} />

                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5>
                    <b>Quiz Score:</b> {getScore(selected)} out of{" "}
                    {questions.length}
                  </h5>
                  <div className="row">
                    <div className="col-md-8 mx-auto">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                      />
                    </div>
                  </div>
                </div>
                <CSVLink
                  className="btn btn-primary my-3"
                  data={selected}
                  filename={"quiz_result.csv"}
                  headers={headers}
                >
                  Download CSV
                </CSVLink>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Your Answer</th>
                        <th>Correct Answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.map((r) => {
                        return (
                          <tr key={r.qId}>
                            <td>
                              <img
                                src={r.image}
                                className="question-image"
                                alt=""
                              />
                            </td>
                            <td>{r.op}</td>
                            <td>{r.answer}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

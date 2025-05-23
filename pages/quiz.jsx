import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import db from "../db.json";
import Widget from "../src/components/Widget";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/QuizContainer";
import Button from "../src/components/Button";
import LoadingSpinner from "../src/components/LoadingSpinner";

function StartWidget({ onStart }) {
  return (
    <Widget>
      <Widget.Header>
        <h1>Rick and Morty Quiz</h1>
      </Widget.Header>
      <Widget.Content>
        <img
          src="https://rollingstone.com.br/media/_versions/rick-morty-season4-finale-reprod_widelg.jpg"
          alt="Rick and Morty"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        />
        <h2>Bem-vindo ao Quiz de Rick and Morty!</h2>
        <p>
          Teste seus conhecimentos sobre uma das séries de animação mais
          populares da atualidade. São 10 questões desafiadoras que vão testar o
          quanto você realmente sabe sobre o multiverso de Rick and Morty.
        </p>
        <p style={{ marginTop: "10px", marginBottom: "20px" }}>
          Está preparado para essa aventura? Wubba Lubba Dub Dub!
        </p>
        <Button type="button" onClick={onStart}>
          Começar Quiz
        </Button>
      </Widget.Content>
    </Widget>
  );
}

StartWidget.propTypes = {
  onStart: PropTypes.func.isRequired,
};

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content>
        <LoadingSpinner />
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  const totalQuestions = results.length;
  const correctAnswers = results.filter((result) => result).length;

  return (
    <Widget>
      <Widget.Header>Resultado Final</Widget.Header>
      <Widget.Content>
        <p>
          Você acertou {correctAnswers}{" "}
          {correctAnswers === 1 ? "questão" : "questões"} de {totalQuestions}
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              Questão {index + 1}: {result ? "Acertou ✅" : "Errou ❌"}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] =
    React.useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.descriptions}</p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmitted(true);

            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmitted(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const isSelected = selectedAlternative === alternativeIndex;
            const alternativeStatus = isQuestionSubmitted
              ? isCorrect
                ? "SUCCESS"
                : "ERROR"
              : undefined;

            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isSelected && alternativeStatus}
              >
                <input
                  style={{ display: "none" }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={isSelected}
                />
                {`${alternativeIndex + 1}. ${alternative}`}
                {isSelected && !isQuestionSubmitted && " ✓"}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={selectedAlternative === undefined}>
            Confirmar
          </Button>

          {isQuestionSubmitted && (
            <p
              style={{
                marginTop: "10px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {isCorrect ? "✅ Você acertou!" : "❌ Você errou!"}
            </p>
          )}
        </form>
      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    answer: PropTypes.number,
    alternatives: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired,
};

const screenStates = {
  START: "START",
  LOADING: "LOADING",
  QUIZ: "QUIZ",
  RESULT: "RESULT",
};

export default function Quiz() {
  const [screenState, setScreenState] = React.useState(screenStates.START);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const question = db.questions[currentQuestion];

  function addResult(result) {
    setResults([...results, result]);
  }

  function handleStartQuiz() {
    setScreenState(screenStates.LOADING);
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }

  function handleSubmit() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Rick and Morty Quiz</title>
      </Head>

      <QuizContainer>
        {screenState === screenStates.START && (
          <StartWidget onStart={handleStartQuiz} />
        )}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={currentQuestion}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/juaodantas" />
    </QuizBackground>
  );
}

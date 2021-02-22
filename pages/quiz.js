import React from 'react';
import Head from 'next/head'

import db from '../db.json'
import Widget from '../src/components/Widget'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button'


function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregado ...
            </Widget.Header>
            <Widget.Content>
                [ Desafio do Loading ]
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit }) {

    const questionId = 'quetion__${questionIndex}';
    return (
        <Widget>
            <Widget.Header>
                <h3>
                    {`Pergunta ${questionIndex + 1} de  ${totalQuestions}`}
                </h3>
            </Widget.Header>
            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.descriptions}
                </p>

                <form onSubmit={(infosDoEvento) => {
                    infosDoEvento.preventDefault();
                    onSubmit();
                }}>
                    {question.alternatives.map((alternatives, alternativesIndex) => {
                        const alternativesId = `alternatives__${alternativesIndex}`;
                        return (
                            <Widget.Topic as="label" htmlFor={alternativesId} >
                                <input
                                    // style={{ display: "none" }}
                                    id={alternativesId}
                                    name={questionId}
                                    type="radio"
                                />
                                {alternatives}
                            </Widget.Topic>
                        );
                    })}

                    <Button type="submit">
                        Confirmar
                </Button>
                </form>

            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};
export default function quiz() {
    console.log('Perguntas criadas: ', db.questions);
    const [CurrentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = CurrentQuestion;
    const question = db.questions[questionIndex];
    const totalQuestions = db.questions.length;
    const [screenState, setScreamState] = React.useState(screenStates.LOADING);

    React.useEffect(() => {
        setTimeout(() => {
            setScreamState(screenStates.QUIZ);
        }, 1 * 1000);
    }, [])

    function handleSubmit() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setScreamState(screenStates.RESULT);

        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>Rick and Morty</title>
            </Head>

            <QuizContainer>
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmit}
                    />
                )}


                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div>Parabens</div>}


            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/JvDantas" />
        </QuizBackground>
    );
}
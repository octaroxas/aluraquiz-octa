import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/gitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';


function WidgetLoading() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>
            <Widget.Content>
                Mensagem do Loading!
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget( { question, totalQuestion, questionIndex, onSubmit} ){
    const questionId = `question__${questionIndex}`;
    return (
        <Widget>
        <Widget.Header>
            {/* <BackLinkArrow href="/" /> */}
            <h3>
                {`Pergunta ${questionIndex + 1} de ${totalQuestion}`}
            </h3>
        </Widget.Header>

        <img
            alt="Descrição"
            style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover'
            }}                    
            src= {question.image}
        >
        </img>

        <Widget.Content>
            <h1>
                {question.title}
            </h1>

            <p>
                {question.description}
            </p>

            <form
                onSubmit={(infoDoEvento) => {
                    infoDoEvento.preventDefault(); 
                    onSubmit();
                }}
            >
                {question.alternatives.map((alternative, alternativeIndex) => {
                    const alternativeId = `alternative__${alternativeIndex}`;
                    return (
                        <Widget.Topic
                        as="label"
                            htmlFor={alternativeId}
                        >
                            <input 
                                name={questionId}
                                id={alternativeId}
                                type="radio"
                            />
                            {alternative}
                        </Widget.Topic>
                    );
                })}


                {/* <pre> {JSON.stringfy(question, null, 4)}</pre> */} {/** debug no próprio componente */}

                <Button>
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
    RESULT: 'RESULT'
}

function QuizPage(){
    console.log('Perguntas criadas: ', db.questions);

    const [screenState, setScreenState] = React.useState(screenStates.LOADING); {/**Hook */}
    const totalQuestion = db.questions.length;
    const [CurrentQuestion, setCurrentQuestion] = React.useState(0); {/**Hook */}
    const questionIndex = CurrentQuestion;
    const question = db.questions[questionIndex];

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 2 * 1000 );
    }, []);

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestion ) {
            setCurrentQuestion(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return(
        <QuizBackground backgroundImage={db.fundo} >
            <QuizContainer>
                <QuizLogo />
                {screenState === screenStates.LOADING && ( <WidgetLoading /> )}
                
                {screenState === screenStates.QUIZ && (
                        <QuestionWidget 
                        question={question} 
                        totalQuestion={totalQuestion}
                        questionIndex={questionIndex}
                        onSubmit={handleSubmitQuiz}
                    /> 
                )}

                {screenState === screenStates.RESULT && ( <div>Voce acertou nenhuma, parabéns</div> )}
            </QuizContainer>
        </QuizBackground>
    );
}

export default QuizPage;
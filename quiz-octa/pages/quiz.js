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
import AlternativesForm from '../src/components/AlternativesForm';

const NotificationResultCorrect = styled.div`
    width:100%;
    background-color: ${({ theme }) => theme.colors.success};
    padding-top:20px;
    padding-bottom: 20px;

    display:flex;
    justify-content:center;
    align-items: center;
    margin-top: 20px;
    border-radius:7px;
    font-weight: bold;
    font-size: 30px;
`;

const NotificationResultWrong = styled.div`
    width:100%;
    background-color: ${({ theme }) => theme.colors.wrong};
    padding-top:20px;
    padding-bottom: 20px;

    display:flex;
    justify-content:center;
    align-items: center;
    margin-top: 20px;
    border-radius:7px;
    font-weight: bold;
    font-size: 30px;
`;

function WidgetResult({ results, playerName }) {

    return (
        <Widget>
            <Widget.Header>
                Resultado do Quiz
            </Widget.Header>
            <Widget.Content>
                {/**pesquisar mais sobre o método reduce() */}
                <p style={{fontFamily:'Lato', fontWeight: 900, fontSize: 20, maxWidth: 300, lineHeight:1}}>
                    Você acertou
                    {' '} {/** adiciona um espaço entre as palavras */}
                        {results.reduce((somatorioAtual, resultadoAtual) => {
                            const isAcerto = resultadoAtual === true;
                            if(isAcerto) {
                                return somatorioAtual + 1;
                            }
                            return somatorioAtual;
                        }, 0)} {/** o '0' é a inicialização do resultadoAtual */}
                    {' '}
                    perguntas!
                </p>

                <ul style={{fontFamily:'Lato', fontWeight: 900, fontSize: 15, maxWidth: 300, lineHeight:1.3}}>
                    {results.map((result, index) => (
                        <li key={`result__${result}`}>
                            #{index + 1} Resultado: 
                            {result === true ? ' Acertou'  : ' Errou'} {/* se o item 'result' for true retorna 'Acertou', caso contrário 'Errou'  */}
                        </li>
                    ))}
                </ul>
            </Widget.Content>
            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover'
                }}                    
                src="https://media.giphy.com/media/d68IdpvmAHohx5NMEV/giphy.gif"
            >
            </img>
            <Widget.Content>


                <p style={{fontFamily:'Lato', fontWeight: 900, fontSize: 30, maxWidth: 300, lineHeight:1, color: db.theme.colors.primary}}>
                    {playerName},<br/> Obrigado por jogar! <br/> Até a próxima! <br/> <strong>Yes Baby!</strong>
                </p>

                
            </Widget.Content>
        </Widget>
    );
}

function WidgetLoading() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '290px',
                    objectFit: 'cover'
                }}                    
                //src= "https://gfycat.com/enchantingpresentfrogmouth"
                src= "https://media.giphy.com/media/3y0oCOkdKKRi0/giphy.gif"
                //src="https://media.giphy.com/media/d68IdpvmAHohx5NMEV/giphy.gif"
            >
            </img>
            <Widget.Content>
                As perguntas do Quiz estão sendo carregadas!
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget( { question, totalQuestion, questionIndex, onSubmit, addResult} ){
    const questionId = `question__${questionIndex}`;
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const isCorrect = selectedAlternative === question.answer;
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const hasAlternativeSelected = selectedAlternative !== undefined;
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
                    height: '200px',
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
                <AlternativesForm
                    onSubmit={(infoDoEvento) => {
                        infoDoEvento.preventDefault(); 
                        setIsQuestionSubmited(true);
                        setTimeout(() => {
                            addResult(isCorrect);
                            onSubmit(); //Mudar estado -> Trocar a pergunta ou mostrar resultado final
                            setIsQuestionSubmited(false);
                            setSelectedAlternative(undefined);
                        }, 2* 1000)
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => { /* O 'map' sempre retorna algo, seja um valor ou objeto */
                        const alternativeId = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS': 'ERROR';
                        const isSelected = selectedAlternative === alternativeIndex;
                        return (
                            <Widget.Topic
                            as="label"
                            key={alternativeId}
                            htmlFor={alternativeId} /* faz um for com as alternativas */
                            data-selected={isSelected}
                            data-status={isQuestionSubmited && alternativeStatus}
                            >
                                <input 
                                style={{display: 'none'}}
                                    name={questionId}
                                    id={alternativeId}
                                    type="radio" //{/* input em formato de circulo */}
                                    onChange={() => { 
                                        setSelectedAlternative(alternativeIndex); 
                                       {/** setHasAlternativeSelected(true); */}
                                    }}
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    {/* <pre> {JSON.stringfy(question, null, 4)}</pre> */}                 
                    <Button type='submit' disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>
                    {/*<p>selectedAlternative: {`${selectedAlternative}`}</p>*/} 
                    {isQuestionSubmited && isCorrect && <NotificationResultCorrect><p>Você acertou!</p></NotificationResultCorrect> }
                    {isQuestionSubmited && !isCorrect && <NotificationResultWrong> <p>Você errou!  </p></NotificationResultWrong>}
                </AlternativesForm>
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
    //console.log('Perguntas criadas: ', db.questions);
    const router = useRouter();
    const playerName = router.query.name;

    const [results, setResults] = React.useState([]);
    const [screenState, setScreenState] = React.useState(screenStates.LOADING); {/**Hook */}
    const totalQuestion = db.questions.length;
    const [CurrentQuestion, setCurrentQuestion] = React.useState(0); {/**Hook */}
    const questionIndex = CurrentQuestion;
    const question = db.questions[questionIndex];

    function addResult( result ) {
        setResults([
            ...results,  /* Pegue todos os results anteriores        */
            result      /* E também o result passado como argumento */ 
        ]);
    }

    {/*Pesquisar mais sobre useEffect() */}
    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
            console.log(playerName);
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
                        addResult={addResult}
                    /> 
                )}

                {screenState === screenStates.RESULT && ( <WidgetResult results={results} playerName={playerName} /> )}
            </QuizContainer>
        </QuizBackground>
    );
}

export default QuizPage;
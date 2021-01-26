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


const theme = db.theme;

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const BackgroundImage = styled.div`
  background-image: url(${db.fundo});
  flex:1;
  background-size: cover;
  background-position: center;
`;

export const QuizContainer = styled.div`
  width:100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screem and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  background-color: #1C1814;
  border: 2px solid ${db.theme.colors.primary};
  border-radius: 7px;
  padding-left:15px;

  color: #fff;
  
  margin-top: 20px;
  
`;

const Button = styled.button`

  background-color: ${db.theme.colors.red};

  width: 100%;
  height: 40px;
  border-radius: 7px;
  border: transparent;

  font-weight: bolder;

  margin-top: 20px;
  color:#fff;
`;

const OutrosQuizes = styled.div`
  width: 100%;
  padding: 10px;
  margin-top:5px;
  background-color: ${db.theme.colors.grey};
  font-size:12px;
  border-radius: 5px;

  a {
    color: white;
    text-decoration: none;
  }
`;


export default function Home() {
  const router = useRouter(); // O Hook deve ser instanciado no início para usar localmente na função Home
  // Informa o estado inicial de 'name' 
  const [name, setName]  = React.useState('');

  return (
    <QuizBackground backgroundImage={db.fundo}>
      <Head>
        <title>NerdQuiz</title>
      </Head>
      <QuizContainer>
      <QuizLogo/>
      <Widget>
        <Widget.Header>
          <h1>
            Games, Animes, Tecnologia e afins
          </h1>
        </Widget.Header>
        
        <Widget.Content>
          <p>
            Teste seus conhecimentos e descubra se você é um <i>Nerd</i> de verdade!
          </p>

          <form onSubmit={ function (infoEvento){
            // Previvine que a página execute o refress a cada submissão
            infoEvento.preventDefault();
            console.log('Submisão de nome!');

            // Utiliza o Hook de roteamento para navegar para a pagina 'quiz'
            // passado os query params na url
            router.push(`quiz?name=${name}`);

          }}>

            <Input 
              placeholder="Qual seu nome ?" 
              // A cada vez que o conteúdo do input mudar isso erá refletir no conteúdo de 'name'
              onChange={ function (infoEvento){
                // Conceito de State
                setName(infoEvento.target.value);
                console.log(name);
              }}
            />
            <Button type="submit" disabled={name.length === 0}>
              JOGAR {name}
            </Button>
          </form>
        </Widget.Content>
      </Widget>
      
      <Widget>
        <Widget.Content>
          <h1>
            Outros <i>Quizes</i> da galera
          </h1>

          <p>
            Encontre muitos outros <i>Quizes</i> divertidos como esse para se divertir!
          </p>

          <OutrosQuizes>
            <a href="https://quiz-cavaleiro-zodiaco.vercel.app/" target="blank">
              https://quiz-cavaleiro-zodiaco.vercel.app/
            </a>
          </OutrosQuizes>

          <OutrosQuizes>
            <a href="https://aluraquiz-coffee.leonardot07.vercel.app/" target="blank">
              https://aluraquiz-coffee.leonardot07.vercel.app/
            </a>
          </OutrosQuizes>

          <OutrosQuizes>
            <a href="http://hollow-knigth-quiz.lugusfe.vercel.app/" target="blank">
              http://hollow-knigth-quiz.lugusfe.vercel.app/
            </a>
          </OutrosQuizes>
          

        </Widget.Content>
      </Widget>
      <Footer/>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/octaroxas/aluraquiz-octa"/>
    </QuizBackground>

  );
}

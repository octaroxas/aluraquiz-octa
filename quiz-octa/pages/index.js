import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/gitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import OutrosQuizes from '../src/components/OutrosQuizes';


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

          <p>
            Tente acertar o máximo de perguntas que puder, beleza?
          </p>

          <p style={{fontWeight: 'bold', fontSize: 25}}>
            VAMO LÁ!
          </p>

          <form onSubmit={(infoEvento) => {
            // Previvine que a página execute o refress a cada submissão
            infoEvento.preventDefault();
            console.log('Submisão de nome!');

            // Utiliza o Hook de roteamento para navegar para a pagina 'quiz'
            // passado os query params na url
            router.push(`quiz?name=${name}`);

          }}>

            <Input 
              name="nomeDoUsuario" // propriedade para auxiliar acessibilidade (uso em leitores de tela)
              value={name}
              placeholder="Qual seu nome ?" 
              // A cada vez que o conteúdo do input mudar isso erá refletir no conteúdo de 'name'
              onChange={(infoEvento) => setName(infoEvento.target.value)}
            />

            <Button type="submit" disabled={name.length === 0}>
              {`JOGAR ${name}`}
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

          {db.external.map((linkExterno, index) => { /* ao realizar um 'map', fazer as iterações, é possível ter acesso ao index de cada item */
            let link = linkExterno;
            link = link.replace('https:','')
            .replace('.vercel.app/', '')
            .replace('//','')
            .replace('.','/')

            return (
              <Widget.Topic
                style={{textDecoration: 'none', fontWeight: 'bold', color: `${db.theme.colors.primary}`}}
                key={`linkExternal__${index}`}
                href={linkExterno} 
                target="blank"
              >
                {link}
              </Widget.Topic>
            );
          })} 

        </Widget.Content>
      </Widget>
      <Footer/>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/octaroxas/aluraquiz-octa"/>
    </QuizBackground>

  );
}

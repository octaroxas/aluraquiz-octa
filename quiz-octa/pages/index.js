import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/gitHubCorner';

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


export default function Home() {
  return (
    <QuizBackground backgroundImage={db.fundo}>
      <QuizContainer>
      <Widget>
        <Widget.Header>
          <h1>
            Games, Animes e afins
          </h1>
        </Widget.Header>
        
        <Widget.Content>
          <p>
            Teste seus conhecimentos e descubra se você é um <i>Nerd</i> de verdade!
          </p>
        </Widget.Content>
      </Widget>
      
      <Widget>
        <Widget.Content>
          <h1>
            Outros <i>Quizes</i>
          </h1>

          <p>
            Encontre muitos outros <i>Quizes</i> divertidos como esse para se divertir!
          </p>
        </Widget.Content>
      </Widget>
      <Footer/>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/octaroxas/aluraquiz-octa"/>
    </QuizBackground>

  );
}

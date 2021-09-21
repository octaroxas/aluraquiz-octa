import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import React from 'react';
import styled from 'styled-components';

const QuizContainerBase = styled.div`
  width:100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screem and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;


function QuizContainer(props){
    return (
        <div>
            <QuizContainerBase>
              {props.children}
            </QuizContainerBase>
        </div>
    );
}

export default QuizContainer;
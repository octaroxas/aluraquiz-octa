import React from 'react';
import  QuizScreen  from '../../src/screens/Quiz';

{/* <pre> {/**presquisar a tag <pre/> do html  {JSON.stringify(dbExternal.questions, null, 4)} */} {/*</div></pre> */}

            {/* <pre>
                {JSON.stringify(dbExternal, null, 4)} 
            </pre> */}


export default function QuizDaGalera({dbExternal}) {
    return (
        <div style={{color: 'black'}}>

            <QuizScreen dbExternal={dbExternal}/> {/**Carrega o componente de quiz já pronto e passa como propriedade o objeto com as questoes de outra pessoa */}
        </div>
    );
}

/*O servidor recebe essas propiedades contidas no objeto 'context' e faz as devidas operações */

export async function getServerSideProps(context) {

    const dbExternal = await fetch('https://aluraquiz-coffee.leonardot07.vercel.app/api/db')
    .then((serverResponse) => {
        if(serverResponse.ok) { /* se a resposta está completa entao retorne-a em formato json para ser armazenana na variável dbExternal */
            return serverResponse.json();
        }

        throw new Error('Houve um erro durante o fetch!')
    })
    .then((respostaComoObjeto) => respostaComoObjeto )
    .catch((error) => {
        console.log(error); // Esse console log vai aparecer no servidor e nao no cliente
    })

    //console.log('Arquivo db externo: '+ dbExternal);
    //console.log('id: '+context.query.id); // o nome do query param é 'id' pois o nome do arquivo é 'id'

    return {
      props: {
          dbExternal,
      },             // will be passed to the page component as props
    };              // as propriedades recebidas do server podem ser retornadas para o front-end daqui,.
  }                //  no caso, para o componente QuizDaGalera como um objeto props
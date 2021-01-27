import { func } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import db from '../../../db.json';


const BackgroundImageBase = styled.div`
  background-image: url(${db.fundo});
  flex:1;
  background-size: cover;
  background-position: center;
`;

function BackgroundImage(){
    return (
        <div>
            <BackgroundImageBase />
        </div>
    );
}

export default BackgroundImage;


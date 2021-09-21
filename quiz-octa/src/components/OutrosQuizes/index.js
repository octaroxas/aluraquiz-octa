import { func } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import db from '../../../db.json';

const OutrosQuizesBase = styled.div`
  width: 100%;
  padding: 10px;
  margin-top:5px;
  background-color: ${db.theme.colors.grey};
  font-size:12px;
  border-radius: 5px;

  a {
    color: white;
    text-decoration: none;
    font-weight: bold
  }
`;

function OutrosQuizes(props) {
    return (
        <div>
            <OutrosQuizesBase>
              {props.children}
            </OutrosQuizesBase>
        </div>
    );
}

export default OutrosQuizes;


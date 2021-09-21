import React from  'react';
import styled from 'styled-components';
import db from '../../../db.json';
import PropTypes from 'prop-types';

const ButtonBase = styled.button`

  background-color: ${db.theme.colors.red};
  width: 100%;
  height: 40px;
  border-radius: 7px;
  border: transparent;
  font-weight: bolder;
  margin-top: 20px;
  color:#fff;

  border: 0;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

function Button(props) {
    return (
        <div>
            <ButtonBase type={props.type} disabled={props.disabled} >
                {props.children}
            </ButtonBase>
        </div>
    );
} 

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;

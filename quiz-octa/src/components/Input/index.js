import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import db from '../../../db.json';

const InputBase = styled.input`
  width: 100%;
  height: 40px;
  background-color: #1C1814;
  border: 2px solid ${db.theme.colors.primary};
  border-radius: 7px;
  padding-left:15px;

  color: #fff;
  
  margin-top: 20px;
  
`;

function Input(props) {
    return(
        <div>
            <InputBase onChange={props.onChange} placeholder={props.placeholder}/>
        </div>
    );
}

Input.defaultProps = {
    value: ''
}

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default Input;
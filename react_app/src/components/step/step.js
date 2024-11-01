import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './step.scss';

const Step = ({text}) => {
  
  const [isChecked, setChecked] = useState(false);

  function toggleCheck() {
    setChecked(!isChecked);
  } 

  return (
    <li className={"step " + (isChecked ? "step--checked" : "")} dangerouslySetInnerHTML={{ __html: text }} onClick={toggleCheck}></li>
  )
};

Step.propTypes = {
  text: PropTypes.string.isRequired
};

Step.defaultProps = {};

export default Step;

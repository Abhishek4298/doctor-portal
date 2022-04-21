import { ReusableButton } from "./ButtonReusable";
import React from 'react'
import styled from 'styled-components';

const ModifiedTestButton = styled(ReusableButton)`
background-color:red;
font-weight:bold;
font-size:2rem;
`
const ReusableComponent = () => {
  return (<>
    <h2>Hello Reusable Component</h2>
    <ReusableButton>Button</ReusableButton>
    <ModifiedTestButton>Modified Button</ModifiedTestButton>
  </>);
}

export default ReusableComponent;
import React from "react";


//types
type Props = {
    text: string,
    callback: () => void
}

//styles
import { Wrapper } from "./Button.styles";

const Button: React.FC<Props> = ({ text, callback }) => (
    <Wrapper type="button" onClick={callback}>
        { text }
    </Wrapper>
);

export default Button;
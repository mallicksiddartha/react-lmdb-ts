import React from "react";
//helpers
import { calcTime, convertMoney } from "../../helpers";
//styles
import { Wrapper, Content } from "./MovieInfoBar.styles";

import {Movie} from "../../API";
//types
type Props = {
    runtime: Movie["runtime"],
    budget: Movie["budget"],
    revenue: Movie["revenue"]
}


const MovieInfoBar: React.FC<Props> = ({ runtime, budget, revenue }) => (
    <Wrapper>
        <Content>
            <div className="column">
                <p>Running time: {calcTime(runtime)}</p>
            </div>
            <div className="column">
                <p>Budget: {convertMoney(budget)}</p>
            </div>
            <div className="column">
                <p>Revenue: {convertMoney(revenue)}</p>
            </div>
        </Content>
    </Wrapper>
);

export default MovieInfoBar;
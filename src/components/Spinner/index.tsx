import { Spinner, NestedSpinner } from "./Spinner.styles";


const TwoSpinner: React.FC = () => {
    return (
        <Spinner>
            <NestedSpinner>

            </NestedSpinner>
        </Spinner>
    )
}

export default TwoSpinner;
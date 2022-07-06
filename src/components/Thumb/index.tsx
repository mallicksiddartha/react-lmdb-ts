import React from "react";
//routing
import { Link } from "react-router-dom";

//styles
import { Image } from "./Thumb.styles";

//types
type Props = {
    image: string,
    movieId: number,
    clickable: boolean | null | undefined
}

const Thumb: React.FC<Props> = ({ image, movieId, clickable }) => (
    <div>
        {
            clickable ? (
                <Link to={`/${movieId}`}>
                    <Image src={image} alt='movie-thumb' />
                </Link>
            ) : (
                <Image src={image} alt='movie-thumb' />
            )
        }
    </div>
);

export default Thumb;
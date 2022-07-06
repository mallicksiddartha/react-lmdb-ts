import { useState, useEffect } from "react";
import API, { Movie, Cast, Crew } from "../API";
// Helper
import { isPersistedState } from "../helpers";

//types
export type MovieState = Movie & {
    actors: Cast[],
    directors: Crew[]
}

export const useMovieFetch = (movieId: number) => {
    const [state, setState] = useState<MovieState>({} as MovieState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);

                //get directors
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );
                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                });

            } catch (error) {
                setError(true);
            }

            setLoading(false);
        }

        const sessionMovie = isPersistedState(movieId.toString());
        if (sessionMovie) {
            setLoading(false);
            setState(sessionMovie);
            return;
        }

        fetchMovie();

    }, [movieId]);

    // Write loaded movie in sessionStorage
    useEffect(() => {
        if (Object.keys(state).length !== 0) {
            sessionStorage.setItem(movieId.toString(), JSON.stringify(state));
        }
    }, [movieId, state]);

    return { state, loading, error };
};

import { useState, useEffect } from "react";
//API
import API, { Movie } from "../API";
//helpers
import { isPersistedState } from "../helpers";
//session storage key
import { HOME_SESSION_STORAGE_KEY } from '../config';

//initial State

const initialState = {
    page: 0,
    results: [] as Movie[],
    total_pages: 0,
    total_results: 0
};


export const useHomeFetch = () => {

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoadMore, setIsLoadMore] = useState(false);

    const fetchMovies = async (page: number, searchTerm = '') => {
        try {
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);
            // console.log(movies);

            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))

        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    //initial data and searched data
    useEffect(() => {
        if (!searchTerm && HOME_SESSION_STORAGE_KEY !== undefined) {
            const sessionState = isPersistedState(HOME_SESSION_STORAGE_KEY);

            if (sessionState) {
                //const sessionDataArr: Array<string> = JSON.parse(sessionState);
                //console.log('From sessionStorage');
                //console.log(sessionState);
                //console.log(sessionDataArr);
                setState(sessionState);
                return;
            }
        }
        //console.log('From API');
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm])

    /**
     * Effect for pressing load more button
     */
    useEffect(() => {
        if (!isLoadMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadMore(false);

    }, [searchTerm, state.page, isLoadMore]);

    // Write to sessionStorage
    useEffect(() => {
        if (!searchTerm && HOME_SESSION_STORAGE_KEY !== undefined && state.results.length > 0) {
            sessionStorage.setItem(HOME_SESSION_STORAGE_KEY, JSON.stringify(state));
        }

    }, [searchTerm, state]);

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadMore }
}
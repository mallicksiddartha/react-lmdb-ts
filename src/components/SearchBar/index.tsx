import React, { useState, useEffect, useRef } from "react";

//images
import searchIcon from "../../images/search-icon.svg"

//styles
import { Wrapper, Content } from "./SearchBar.styles";

//types 
type Props = {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

/**
 * 
 * @param { setSearchTerm The setter function for search term typed by user} param0 
 * @returns Search bar for movies with related functionality
 */
const SearchBar: React.FC<Props> = ({ setSearchTerm }) => {
    const [ state, setState ] = useState('');

    const initial = useRef(true);

    useEffect (() => {
        if(initial.current) {
            initial.current = false;
             return;
        }

        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 1000);

        return () => clearTimeout(timer);

    },[setSearchTerm, state]);

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon" />
                <input 
                    type="text"
                    placeholder="Search movie"
                    onChange={event => setState(event.currentTarget.value)}
                    value={ state }
                />
            </Content>
        </Wrapper>
    );

};

export default SearchBar;
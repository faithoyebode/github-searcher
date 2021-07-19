import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';


const Search: FC<any> = (): ReactElement => {

    return (
        <SearchScreenWrapper>
            Search Screen
        </SearchScreenWrapper>
    );
}


const SearchScreenWrapper = styled.div`
    color: 'red';
    font-size: 40px;
`;


export default Search;
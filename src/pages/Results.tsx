import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';


const Results: FC<any> = (): ReactElement => {

    return (
        <ResultsScreenWrapper>
            Results Screen
        </ResultsScreenWrapper>
    );
}


const ResultsScreenWrapper = styled.div`
    color: 'red';
    font-size: 40px;
`;


export default Results;
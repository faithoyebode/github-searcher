import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';


const Home: FC<any> = (): ReactElement => {

    return (
        <HomeScreenWrapper>
            Home Screen
        </HomeScreenWrapper>
    );
}


const HomeScreenWrapper = styled.div`
    color: 'red';
    font-size: 40px;
`;


export default Home;
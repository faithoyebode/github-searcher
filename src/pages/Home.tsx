import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';


const Home: FC<any> = (): ReactElement => {

    return (
        <HomeScreenWrapper>
            <button>Login to Github</button>
        </HomeScreenWrapper>
    );
}


const HomeScreenWrapper = styled.div`
    color: red;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    button{
        all: unset;
        color: #ffffff;
        background: #5C5C5C;
        border-radius: 5px;
        width: 179px;
        height: 50px;
        text-align: center;
    }
`;


export default Home;
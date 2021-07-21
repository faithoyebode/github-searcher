import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';


const Home: FC<any> = (): ReactElement => {

    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const history = useHistory();
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');

    useEffect(() => {
        if(code){
            setLoading(true);
            console.log("code: ", code);

            fetch(`${process.env.REACT_APP_PROXY_SERVER}/${code}`).then(
                response => response.json()
            ).then((data) => {
                setToken(data.token);
                localStorage.setItem('searcherToken', data.token);
                setLoading(false);
                history.push('/search');
            }).catch((error) => {
                console.log("error: ", error);
            });
        }
        
    // eslint-disable-next-line
    }, [code]);

    return (
        <HomeScreenWrapper>
            { loading ? (<span className="ml-15 loader"></span>) :

            (
                <a 
                    className="button"
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user`}
                >
                    Login to Github
                </a>
            )}
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

    .loader {
        border: 3px solid hsl(0deg 0% 0% / 20%);
        border-top-color: #5C5C5C;
        border-radius: 50%;
        width: 3.5em;
        height: 3.5em;
        animation: spin 0.7s linear infinite;
        margin: auto;
    }

    @keyframes spin {
        to {
          transform: rotate(360deg);
        }
    }

    .button{
        all: unset;
        color: #ffffff;
        background: #5C5C5C;
        border-radius: 5px;
        width: 179px;
        height: 50px;
        text-align: center;
        line-height: 50px;
    }
`;


export default Home;
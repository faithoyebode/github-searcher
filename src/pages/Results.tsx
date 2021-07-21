import React, { FC, ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import Header from 'components/Header';
import previousArrow from 'assets/icons/previousArrow.svg';

interface UsersVars {
    text: string,
    after?: string,
    before?: string 
};

interface UsersData {
    search: any;
}

const REPOS_QUERY = gql`
query search($text: String!){
    search(query: $text, type: REPOSITORY, first: 10) {
    nodes {
        ... on Repository {
        id
        name 
        updatedAt
        licenseInfo {
            name
        }
        stargazerCount
        languages(first: 1) {
            nodes {
            name
            }
        }
        description
        }
    }
    pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
    }
    repositoryCount
    userCount
    }
}
`; 


const USERS_QUERY = gql`
query search($text: String!, $after: String, $before: String){
    search(query: $text, type: USER, first: 10, after: $after, before: $before) {
      repositoryCount
      userCount
      nodes {
        ... on User {
          id
          name
          bio
          location
        }
      }
      pageInfo {
        endCursor
        startCursor
      }
    }
}
`; 


const Results: FC<any> = (): ReactElement => {
    const history = useHistory();
    const search = useLocation().search;
    const searchQuery: any = new URLSearchParams(search).get('search');  
    const [searchText, setSearchText] = useState<string>(searchQuery);
    const [resultState, setResultState] = useState<"users" | "repositories">("repositories");
    const [reposState, setReposState] =  useState({});

    
    const { loading: reposLoading, error: reposError, data: reposData, refetch: reposRefetch } = useQuery(REPOS_QUERY, {
        variables: {
            text: searchText
        }
    });

    console.log(reposData);

    const { loading: usersLoading, error: usersError, data: usersData, refetch: usersRefetch } = useQuery<UsersData, UsersVars>(USERS_QUERY, {
        variables: {
            text: searchText
        }
    });

    console.log(usersData);

    const transformCount = (number: number): string | number => {
        if(number > 1000 && (number % 1000) > 0){
            let modifiedNumber: string = (number / 1000).toFixed(2);
            return modifiedNumber + "k";
        }

        if(number % 1000 === 0){
            return (number / 1000) + "k";
        }
        return number;
    }


    const handleSetToUsers = () => {
        setResultState("users");
    }

    const handleSetToRepo = () => {
        setResultState("repositories");
    }

    const handleTextChange = (e: any) => {
        setSearchText(e.target.value);
    }

    const handleUsersPrev = (e: any) => {
        let value: string = e.target.value;
        usersRefetch({
            before: value
        });
    }

    const handleUsersNext = (e: any) => {
        let value: string = e.target.value;
        usersRefetch({
            after: value
        }); 
    }

    const convertDateToString = (iso: string): string => {
        let isoDate = new Date(iso);

        let seconds = Math.floor((new Date().valueOf() - isoDate.valueOf()) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
        
    }


    return (
        <ResultsScreenWrapper>
            <Header searchText={searchText} handleTextChange={handleTextChange} />
            <div className="results-section">
                <div className="result-group">
                    <button onClick={handleSetToRepo}>
                        <span className="category">Repositories </span>
                        <span>{reposData && transformCount(reposData.search.repositoryCount)}</span>
                    </button>
                    <button onClick={handleSetToUsers}>
                        <span className="category">Users </span>
                        <span>{usersData && transformCount(usersData.search.userCount)}</span>
                    </button>
                </div>
                <div className="result-items">
                    {usersData && reposData && (
                        <h3 className="title">
                            {resultState === "repositories" ? 
                                (reposData.search.repositoryCount.toLocaleString() + " repository results") :
                                (usersData.search.userCount.toLocaleString() + " users")
                            }
                        </h3>
                    )
                    }
                    {
                        resultState === "repositories" && reposData && (
                            <>
                                {
                                    reposData.search.nodes.map((repo: any, i: number) => (
                                        <div className="repo-card" key={i+1}>
                                            <h4>{repo.name}</h4>
                                            <p>{repo.description}</p>
                                            <p className="other-details">
                                                <span>{transformCount(repo.stargazerCount)} stars | </span>
                                                <span>{repo.languages?.nodes[0]?.name && (`${repo.languages.nodes[0].name} | `)}</span>
                                                <span>{repo?.licenseInfo?.name && (`${repo.licenseInfo.name} | `)}</span>
                                                <span>Updated {convertDateToString(repo.updatedAt)} ago</span>  
                                            </p>
                                        </div>
                                    ))
                                }
                                <div className="repo-btns-section">
                                    <div className="repo-btns">
                                        <button className="prev"><img src={previousArrow} alt="previous" /></button>
                                        <button className="next"><img src={previousArrow} alt="next" /></button>
                                    </div>
                                </div>
                            </>
                            )
                    }

                    {
                        resultState === "users" && usersData && (
                        <>
                            {  
                                usersData.search.nodes.map((user: any, i: number) => (
                                    <div className="user-card" key={i+1}>
                                        <h4><span>{user.name}</span> <span className="sub-name">{user.location}</span></h4>
                                        <p className="description">{user.bio}</p>
                                    </div>
                                ))
                            }
                            <div className="user-btns-section">  
                                <div className="user-btns">
                                    <button className="prev" value={usersData.search.pageInfo.startCursor} onClick={handleUsersPrev}><img src={previousArrow} alt="previous" /></button>
                                    <button className="next" value={usersData.search.pageInfo.endCursor}><img src={previousArrow} onClick={handleUsersNext} alt="next" /></button>
                                </div>
                            </div>
                        </>
                        )
                    }
                </div>
            </div>
        </ResultsScreenWrapper>
    );
}


const ResultsScreenWrapper = styled.div`
    min-height: 100vh;
    background: #E5E5E5;
    margin-bottom: 100px; 

    .results-section{
        display: flex;
        justify-content: center;

        .result-group{
            width: 280px;
            height: 140px;
            padding: 30px;
            margin-right: 20px;
            background: #ffffff;
            box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.1);
            border-radius: 3px;

            button{
                all: unset;
                height: 40px;
                display: flex;
                justify-content: space-between;
                background: #F7F7F8;
                margin-bottom: 10px;
                width: 100%;
                align-items: center;

                span:nth-child(2){
                    background: #DCDCDF;
                    border-radius: 15px;
                    color: #5C5C5C;
                    padding: 5px 10px;
                    font-weight: bold;
                    margin-left: auto;
                }
            }
        }
    }

    .result-items{
        width: 680px;

        .title{
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 25px;
        }

        .repo-card{
            height: 115px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.1);
            border-radius: 3px;
            padding: 20px;
            margin-bottom: 20px;
            
            h4{
                text-transform: capitalize;
            }
            .other-details{
                font-size: 12px;
                
            }

        }
        
        div.repo-btns-section{
            position: absolute;
            left: 0;
            width: 100%;
            background: #ffffff;
            display: flex;
            justify-content: flex-end;
            padding-right: 17%;
            padding-top: 10px;

            .repo-btns{
                display: block;
                width: 100px;
                height: 40px;
                display: flex;
                justify-content: space-between;

                button{
                    all: unset;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: #F3F3F3;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:hover{
                        background: #000000;
                    }

                    img{
                        height: 12px;
                        width: 6px;
                        fill: #ffffff;
                    }

                    &.next{
                        img{
                            transform: rotateZ(180deg);
                        }
                    }
                }
            }
        }

        .user-card{
            height: 85px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.1);
            border-radius: 3px;
            padding: 20px;
            margin-bottom: 20px;

            h4{
                .sub-name{
                    font-weight: normal;
                    font-size: 16px;
                }
            }
            .description{

            }
        }

        div.user-btns-section{
            position: absolute;
            left: 0;
            width: 100%;
            background: #ffffff;
            display: flex;
            justify-content: flex-end;
            padding-right: 17%;
            padding-top: 10px;

            .user-btns{
                display: block;
                width: 100px;
                height: 40px;
                display: flex;
                justify-content: space-between;

                button{
                    all: unset;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: #F3F3F3;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:hover{
                        background: #000000;
                    }

                    img{
                        height: 12px;
                        width: 6px;
                        fill: #ffffff;
                    }

                    &.next{
                        img{
                            transform: rotateZ(180deg);
                        }
                    }
                }
            }
        }
    }
`;


export default Results;
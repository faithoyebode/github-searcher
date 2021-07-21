import React, { FC, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Logo from 'assets/icons/logo.svg';
import SearchIcon from 'assets/icons/search.svg';
import dropdown from 'assets/icons/dropdownArrow.svg';

const USER_INFO_QUERY = gql`
{
    viewer {
    login
    avatarUrl
    email
    name
    }
}
`;

const Search: FC<any> = (): ReactElement => {
    const { loading, error, data, refetch } = useQuery(USER_INFO_QUERY);

    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();
    const handleSearch = (e: any): void => {
        setSearchText(e.target.value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(searchText !== ""){
            history.push(`/results?search=${searchText}`);
        }
    }
    // useEffect(() => {
    //     console.log(data);
    // }, []);

    return (
        <SearchScreenWrapper>
            <div className="header">
                <div className="profile-section">
                    <div className="flex-column">
                        <div className="flex-row">
                            <img src={data && data.viewer.avatarUrl} alt="profile" />
                            <button className="reveal-logout"><span>{data && data.viewer.name}</span><img src={dropdown} alt="dropdown"  /></button>
                        </div>
                        <div className="logout-box">
                            <div>
                                <button>Logout</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="search-section">
                <img src={Logo} alt="github logo" />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="searchText" id="searchText" onChange={handleSearch} value={searchText} />
                        <button type="submit"><img src={SearchIcon} alt="github logo" className="search-icon" /></button>
                    </div>
                    <button type='submit'>Search Github</button>
                </form>
            </div>
        </SearchScreenWrapper>
    );
}


const SearchScreenWrapper = styled.div`
    margin: 0 5%;
    min-height: 100vh;
    position: relative;

    div.header{
        height: 80px;
        position: relative;
        margin-bottom: 110px;

        .profile-section{
            position: absolute;
            top: 15px;
            right: 140px;

            div.flex-column{
                display: flex;
                flex-direction: column;

                div.flex-row{
                    display: flex;
                    align-items: center;

                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }

                    .reveal-logout{
                        all: unset;
                        cursor: pointer;
                        
                        &:hover{
                            opacity: 0.7;
                        }

                        span{
                            margin-left: 10px;
                            margin-right: 10px;
                        }
                        
                        img{
                            opacity: 0.7;
                            width: 12px;
                            height: 7px;
                        }
                    }
                }
            }

            .logout-box{
                div{
                    position: relative;
                    top: 30px;
                    left: -10%;
                    width: 120%;
                    height: 60px;
                    background: #FFFFFF;
                    border: 1px solid rgba(196, 203, 214, 0.3);
                    box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.2);
                    border-radius: 3px;
                    padding-left: 37px;
                    color: red;
                    display: flex;
                    align-items: center;

                    &:after{
                        content: " ";
                        position: absolute;
                        top: 0;
                        right: 5%;
                        transform: translateY(-100%);
                        z-index: 2;
                        border-top: none;
                        border-right: 12px solid transparent;
                        border-left: 12px solid transparent;
                        border-bottom: 25px solid #ffffff;
                    }

                    button{
                        all: unset;
                        display: block;
                        color: red;

                        &:hover{
                            opacity: 0.7;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }

    div.search-section{
        text-align: center;
        margin-bottom: 100px;

        img{
            width: 205px;
            height: 70px;
            margin-bottom: 20px;
        }

        form{
            display: flex;
            flex-direction: column;
            align-items: center;

            .form-group{
                position: relative;
                margin-bottom: 30px;

                input{
                    display: block;
                    width: 580px;
                    height: 50px;
                    background: #FFFFFF;
                    border: 1px solid #C4C4C4;
                    box-sizing: border-box;
                    border-radius: 100px;
                    outline: none;
                    padding-left: 30px;
                    padding-right: 50px;

                    &:focus{
                        border: 1px solid #464545;
                    }
                }
                button{
                    all: unset;
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 20px;
                    width: 18px;
                    height: 18px;
                    transform: translateY(-50%);

                    img{
                        width: 100%;
                        height: 100%;
                        margin: 0;

                        &:hover{
                            opacity: 0.7;
                        }
                    }
                }
            }

            button{
                all: unset;
                width: 179px;
                height: 40px;
                background: #5C5C5C;
                border-radius: 5px;
                color: #ffffff;
                text-align: center;
                line-height: 40px;
            }
        }
    }
`;


export default Search;
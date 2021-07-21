import React, { FC, ReactElement }  from 'react';
import { gql, useApolloClient } from '@apollo/client';
import styled from '@emotion/styled';
import Logo from 'assets/icons/logo.svg';
import SearchIcon from 'assets/icons/search.svg';
import dropdown from 'assets/icons/dropdownArrow.svg';
import ProfilePic from 'assets/images/profile.png';

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


const Header: FC<any> = ({ searchText, handleTextChange, handleTextSubmit }): ReactElement => {

    const client = useApolloClient();

    const userInfo = client.readQuery({ query:  USER_INFO_QUERY });

    return (
        <HeaderWrapper>
            <img src={Logo} alt="github logo" className="logo" />
            <form className="form-group">
                <input type="text" name="search" id="search" placeholder="Search" value={searchText} onChange={handleTextChange} />
                <button type="submit"><img src={SearchIcon} alt="github logo" className="search-icon" /></button>
            </form>
            <div className="profile-section">
                <div>
                    <img src={userInfo && userInfo.viewer.avatarUrl} alt="profile" />
                    <button className="reveal-logout"><span>{userInfo && userInfo.viewer.name}</span><img src={dropdown} alt="profile"  /></button>
                </div>
                <div className="logout-btn">Logout</div>
            </div>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 8%;
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(196, 203, 214, 0.7);
    align-items: center;
    height: 80px;
    margin-bottom: 30px;

    .logo{
        width: 150px;
        height: auto;
    }

    .form-group{
        position: relative;

        input{
            border: 1px solid #C4C4C4;
            box-sizing: border-box;
            border-radius: 100px;
            width: 380px;
            height: 40px;
            outline: none;
            padding-left: 20px;
            padding-right: 40px;

            &:focus{
                border: 1px solid #464545;
            }
        }
        button{
            all: unset;
            position: absolute;
            top: 50%;
            right: 15px;
            width: 18px;
            height: 18px;
            transform: translateY(-50%);

            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    .profile-section{
        

        div{
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

                    img{
                        opacity: 0.7;
                    }
                }

                span{
                    margin-left: 10px;
                    margin-right: 10px;
                }

                img{
                    width: 12px;
                    height: 7px;
                }
            }
        }

        .logout-btn{
            all: unset;
            position: relative;
            width: 100%;
            height: 60px;
            background: #FFFFFF;
            border: 1px solid rgba(196, 203, 214, 0.3);
            box-shadow: 0px 6px 58px rgba(196, 203, 214, 0.2);
            border-radius: 3px;
            padding-left: 37px;
            color: red;

            &:after{
                content: " ";
                position: absolute;
                width: 40px;
                top: 0;
                right: 0;
                height: 80px;
                z-index: 1;
                border-top: none;
                border-right: 12px solid transparent;
                border-left: 12px solid transparent;
                border-bottom: 30px solid red;
            }
        }
    }
`;

export default Header;

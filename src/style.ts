import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  body {
    font-family: 'Roboto', sans-serif;
  }
` 

export const MainContainer = styled.div<any>`
  margin-top: 70px;
`

export const NavBar = styled.nav<any>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(139,45,45,1) 0%, rgba(204,65,71,1) 100%)
`

export const NavUL = styled.ul<any>`
  display: flex;
  justify-content: flex-end;
  padding: 10px 5px;
  list-style: none;
  color: #ffffff
`

export const NavLink = styled(Link)<any>`
  text-decoration: none;
  color: #ffffff
`

export const NavListItem = styled.li<any>`
  padding: 0 5px;
`

export const Replies = styled.div<any>`
  position: fixed;
  top: 70px;
  right: 50px;
  background: linear-gradient(0deg, rgba(139,45,45,1) 0%, rgba(204,65,71,1) 100%);
  border-radius: 3%; 
`

export const ReplyUL = styled.ul<any>`
padding-left: 0;
  list-style: none;
`

export const ReplyItem = styled.li<any>`
  min-width: 280px;
  padding: 5px 8px;
  text-align: center;
`

export const Button = styled.button<any>`
  font-size: 16px;
  background: transparent;
  border: none;
  color: #ffffff;
  ${props => props.primary && `
    background: #9a6bb0;
    color: #ffffff;
    &:hover {
      background: #ffffff;
      color: #9a6bb0;
    }
  `}
`
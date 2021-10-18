import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  body {
    font-family: 'Roboto', sans-serif;
  }
  box-sizing: border-box;
` 

export const Logo = styled.span<any>`
  position: fixed;
  top: 21px;
  left: 25px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  user-select: none;
`

export const MainContainer = styled.div<any>`
  margin-top: 80px;
`

export const NavBar = styled.nav<any>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(0deg, rgba(139,45,45,1) 0%, rgba(204,65,71,1) 100%);
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
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
  color: #ffffff;
  padding: 27px 15px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #742525;
  }
  transition: all 0.2s linear;
  ${props => props.reply && `
    &:hover {
      background: 0;
    }
  `}
`

export const NavListItem = styled.li<any>`
  padding: 0 0;
`

export const Replies = styled.div<any>`
  position: fixed;
  top: 70px;
  right: 50px;
  background: linear-gradient(0deg, rgba(139,45,45,1) 0%, rgba(204,65,71,1) 100%);
  border-radius: 3px;
`

export const ReplyLogo = styled.span<any>`
  padding: 27px 15px;
  margin: 0;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s linear;
  &:hover {
    background: #742525;
  }
`

export const ReplyUL = styled.ul<any>`
  padding-left: 0;
  list-style: none;
  cursor: pointer;
`

export const ReplyItem = styled.li<any>`
  min-width: 280px;
  padding: 5px 8px;
  text-align: center;
  transition: all 0.2s linear;
`
export const ReplyInner = styled.span<any>`
  padding: 23px 11px;
  transition: all 0.2s linear;
  &:hover {
    background: #742525;
  }
`

export const Button = styled.button<any>`
  padding: 5px 5px;
  font-size: 16px;
  background: transparent;
  font-family: 'Roboto', sans-serif;
  color: #af2f35;
  cursor: pointer;
  border: 2px solid #cc4147;
  border-radius: 3px;
  transition: all 0.2s linear;
  &:hover {
    color: #ffffff;
    background: #cc4147;
  }
  ${props => props.primary && `
    background: #cc4147;
    color: #ffffff;
    &:hover {
      background: #ffffff;
      color: #af2f35;
    }
  `}
  ${props => props.search && `
    margin-left: 5px;
  `}
`

export const SearchContainer = styled.div<any>`
  display: flex;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 98vw;
    height: 1px;
    background: #cc4147;
    opacity: 0.4;
  }
`

export const SearchElem = styled.div<any>`
  min-width: 150px;
  padding: 0 30px;
  border-right: 1px solid #cc4147;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
    border: 0;
  }
`

export const SearchSelect = styled.select<any>`
  padding: 5px 5px;
  margin-right: 5px;
  overflow: hidden;
  cursor: pointer;
  width: 120px;
  font-family: 'Roboto', sans-serif;
  outline: none;
	border: 2px solid #cc4147;
  border-radius: 3px;
  text-transform: uppercase;
  background: #ffffff;
  ${props => props.genre && `
    margin-left: 60px
  `}
`

export const SearchForm = styled.form<any>`
  margin-top: 10px;
`

export const SearchInput = styled.input<any>`
  width: 40px;
  font-size: 16px;
  padding: 5px 5px;
  border: 2px solid #cc4147;
  border-radius: 3px;
  ${props => props.author && `
    width: 194px;
  `}
`

export const BookUL = styled.ul<any>`
  width: 90vw;
  margin: 0 auto;
  margin-top: 40px;
  padding-left: 20px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const BookLink = styled(Link)<any>`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: #000000
`

export const BookLI = styled.li<any>`
  margin-right: 20px;
  margin-top: 20px;
  flex-basis: 30%;
  width: 30%;
  border: 1px solid rgba(204, 65, 71, 0.4);;
  border-radius: 3px;
  transition: box-shadow 0.15s linear;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:hover {
    box-shadow: 0px 0px 20px 2px rgba(34, 60, 80, 0.22);
  }
`

export const BookInner = styled.div<any>`
  ${props => props.price && `
    font-size: 32px;
  `}
`

export const BookPropName = styled.span<any>`
  font-weight: 700;
`

export const BookDescription = styled.div<any>`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const UpperSection = styled.div<any>`

`
export const LowerSection = styled.div<any>`
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
`
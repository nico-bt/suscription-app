import React from 'react'
import { Container } from 'react-bootstrap'
import styled from "styled-components"
import heroImg from "../img/hero-image.png"
import ModalComp from './ModalComponent'
// import ModalComp from "../ModalComp/ModalComp"

const HeroComponent = styled.header`
    background-size: cover;
    background-image: url(${heroImg});
    background-repeat: no-repeat;
    background-position: bottom;
    padding: 5rem 0;
    height: 90vh;
`
const HeaderContainer = styled.div`
    background-color: rgba(108, 0, 127, 0.8);
    padding: 3rem;
    color: white;
    width: 32.5rem;
    border-radius: 6px;
`
const Heading = styled.h1`
    font-size: 3.5rem;
    `
const SubHeading = styled.h3`
    margin: 1rem 0;
    font-weight: 400;
    font-size: 1.25rem;
`

function Hero() {
  return (
    <HeroComponent>
        <Container>
            <HeaderContainer>
                <Heading>Feed your mind</Heading>
                <SubHeading>Grow and learn by reading some of the top articles. </SubHeading>
                <SubHeading>Your mind is more permeable than you think, be careful of what you consume</SubHeading>
                <ModalComp text="Signup" variant="warning"/>
                <ModalComp text="Login" variant="success"/>
            </HeaderContainer>
        </Container>
    </HeroComponent>
  )
}

export default Hero
import React from "react"
import { Container } from "react-bootstrap"
import styled from "styled-components"
import heroImg from "../img/hero-image.png"
import ModalComp from "./ModalComponent"

const HeroComponent = styled.header`
  background-size: cover;
  background-image: url(${heroImg});
  background-repeat: no-repeat;
  background-position: bottom;
  padding: 5rem 0;
  height: 100vh;
  @media (max-width: 500px) {
    padding: 0.5rem;
  }
`
const HeaderContainer = styled.div`
  background-color: rgba(108, 0, 127, 0.8);
  padding: 3rem;
  color: white;
  max-width: 30rem;
  border-radius: 6px;
  @media (max-width: 500px) {
    padding: 1.75rem;
  }
`
const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 2.5rem;
  letter-spacing: 2px;
  @media (max-width: 500px) {
    font-size: 3rem;
  }
`
const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.6;
  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`

function Hero() {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed your mind</Heading>
          <SubHeading>
            Your mind is more permeable than you think, be careful of what you consume.
          </SubHeading>
          <SubHeading>Grow and learn by reading some of the top articles. </SubHeading>
          <div className="d-flex justify-content-center mt-5">
            <ModalComp text="Signup" variant="warning" />
            <ModalComp text="Login" variant="success" />
          </div>
        </HeaderContainer>
      </Container>
    </HeroComponent>
  )
}

export default Hero

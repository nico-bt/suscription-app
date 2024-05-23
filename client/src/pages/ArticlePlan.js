import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Button, Card } from "react-bootstrap"
import styled from "styled-components"
import { BASE_URL } from "../utils/data"

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`

const CardHeader = styled.div`
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`

const PriceCircle = styled.div`
  border: 0.1rem solid white;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
  background-color: rgba(19, 20, 19, 0.342);
  @media (max-width: 768px) {
    width: 6rem;
    height: 6rem;
  }
`

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`

function ArticlesPlan() {
  const [prices, setPrices] = useState([])

  const fetchPrices = async () => {
    try {
      const { data: response } = await axios.get(`${BASE_URL}/api/subs/prices`)
      // order by price
      response.prices.data.sort((x, y) => x.unit_amount - y.unit_amount)
      setPrices(response.prices.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  // When you click "buy" create a Stripe session and redirect to pay url
  const createSession = async (priceId) => {
    const session = await axios.post(`${BASE_URL}/api/subs/session`, {
      priceId,
    })
    // console.log(session.data.url)
    window.location.href = session.data.url
  }

  return (
    <Container>
      <CardsContainer>
        {prices.map((price) => {
          return (
            <Card style={{ width: "18rem", height: "25rem", marginRight: "2rem" }} key={price.id}>
              <CardHeader
                style={{
                  backgroundImage: `url("${price.metadata.img}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <PriceCircle>
                  <PriceText> ${price.unit_amount / 100} </PriceText>
                </PriceCircle>
              </CardHeader>

              <Card.Body style={{ textAlign: "center" }}>
                <CardTitle> {price.metadata.name} </CardTitle>
                <Button variant="primary" className="mt-2" onClick={() => createSession(price.id)}>
                  Buy now
                </Button>
              </Card.Body>
            </Card>
          )
        })}
      </CardsContainer>
    </Container>
  )
}

export default ArticlesPlan

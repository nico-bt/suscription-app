import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import styled from "styled-components"
import ClickeableCard from "../components/ClickeableCard"
import Nav from "../components/Nav"

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
`

const NoArticlesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  flex-direction: column;
  & a {
    font-size: 2rem;
    text-decoration: none;
    border: 2px solid #0d6efd;
    border-radius: 10px;
    padding: 0.2rem 2rem;
    margin-top: 1rem;
  }
`

const ErrorHeader = styled.h2`
  font-size: 2.5rem;
`

function Articles() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [articles, setArticles] = useState([])

  const getArticles = async () => {
    setIsLoading(true)
    try {
      const { data: response } = await axios.get("https://bored-pear-beret.cyclic.app/api/articles")
      /* console.log(response) */
      setArticles(response)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <>
      <Nav />

      <Container>
        {isLoading ? (
          <div className="text-center mt-5">
            <h1 style={{ color: "white" }}>Loading...</h1>
          </div>
        ) : (
          <CardsContainer>
            {articles.length &&
              articles.map((item) => (
                <ClickeableCard item={item} key={item._id}>
                  <Card.Img variant="top" src={item.imageUrl} />

                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <Card.Title>{item.title}</Card.Title>
                  </Card.Body>
                </ClickeableCard>
              ))}
          </CardsContainer>
        )}

        {!error && !isLoading && !articles.length && (
          <NoArticlesContainer>
            <ErrorHeader>You don't have access yet</ErrorHeader>
            <Link to={"/articles-plan"}>Buy a plan</Link>
          </NoArticlesContainer>
        )}

        {error && (
          <NoArticlesContainer>
            <ErrorHeader>
              <div>Sorry...</div>
              <div>Something went wrong.</div>
              <div>Please try again later</div>
            </ErrorHeader>
          </NoArticlesContainer>
        )}
      </Container>
    </>
  )
}

export default Articles

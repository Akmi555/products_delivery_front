import { Link } from "react-router-dom"
import { PageWrapper, Wrapper } from "./styles"

function NotFoundPage() {
  return (
    <PageWrapper>
      <Wrapper>
        <h1>4 &#129373; 4</h1>
        <p>This page doesnt exist</p>
        <Link to={"/"} style={{color: "green"}}>Go to home page</Link>
      </Wrapper>
    </PageWrapper>
  )
}

export default NotFoundPage

import { Global, css } from "@emotion/react"

const globalAppStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li {
    margin: 0;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
`

function GlobalStyles() {
  return <Global styles={globalAppStyles} />
}

export default GlobalStyles

export const globalPageStyles = css`
  display: flex;
  flex: 1;
  background-color: #e8e8e8;
  border-radius: 50px;
  padding: 30px;
`

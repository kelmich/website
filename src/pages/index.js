import * as React from "react"
import * as styles from "../styles/styles";

import WelcomeMessage from "../components/WelcomeMessage";

// styles
// data
// const links = [
//   {
//     text: "Tutorial",
//     url: "https://www.gatsbyjs.com/docs/tutorial/",
//     description:
//       "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
//     color: "#E95800",
//   },
// ]

// build site
const IndexPage = () => {
  return (
    <div style={styles.pageStyles}>
      <title>Michael Keller</title>
      <div style={styles.topSection}>
        <WelcomeMessage />
      </div>
      <div style={styles.middleSection}>
        <h1 style={{ margin: 0 }}>Hi</h1>
      </div>
      <div style={styles.footer}>
        <h1 style={{ margin: 0 }}>Hi</h1>
      </div>
    </div>
  )
}

export default IndexPage

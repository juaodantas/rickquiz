import { createGlobalStyle, ThemeProvider } from "styled-components";
import React from "react";
import PropTypes from "prop-types";

import Head from "next/head";
import db from "../db.json";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family:'Lato', sans-serif;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.constrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next{
    flex: 1;
    display: flex;
    flex-directions: column; 
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

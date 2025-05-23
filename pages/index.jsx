import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

import db from "../db.json";
import Widget from "../src/components/Widget";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizBackground from "../src/components/QuizBackground";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import QuizContainer from "../src/components/QuizContainer";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/quiz?name=${encodeURIComponent(name)}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Rick and Morty Quiz</title>
        <link rel="icon" href="/icons8-rick-e-morty-32.png" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#9bd8d9" />
        <meta
          name="description"
          content="Quiz interativo sobre Rick and Morty - Teste seus conhecimentos sobre a série!"
        />
      </Head>
      <QuizContainer>
        {/* <QuizLogo /> */}
        <Widget>
          <Widget.Header>
            <h1>Rick and Morty</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleSubmit}>
              <Input
                name="nomeDoUsuario"
                onChange={(event) => setName(event.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                gap: "15px",
              }}
            >
              <img
                src="https://github.com/juaodantas.png"
                alt="João Dantas"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "3px solid #9bd8d9",
                }}
              />
              <div>
                <h3 style={{ margin: "0 0 5px 0" }}>João Dantas</h3>
                <p style={{ margin: "0", fontSize: "14px" }}>
                  Engenheiro de Controle e Automação e Desenvolvedor Full Stack
                </p>
                <a
                  href="https://github.com/juaodantas"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#9bd8d9",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  <img
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="GitHub"
                    style={{ width: "16px", height: "16px" }}
                  />
                  @juaodantas
                </a>
              </div>
            </div>

            <p style={{ marginBottom: "15px" }}>
              Este é um quiz interativo sobre Rick and Morty, desenvolvido com
              Next.js e Styled Components. Teste seus conhecimentos sobre uma
              das séries de animação mais populares da atualidade!
            </p>

            <div
              style={{
                backgroundColor: "rgba(155, 216, 217, 0.1)",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ margin: "0 0 10px 0" }}>Tecnologias Utilizadas:</h4>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#9bd8d9",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "12px",
                  }}
                >
                  Next.js
                </span>
                <span
                  style={{
                    backgroundColor: "#9bd8d9",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "12px",
                  }}
                >
                  React
                </span>
                <span
                  style={{
                    backgroundColor: "#9bd8d9",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    fontSize: "12px",
                  }}
                >
                  Styled Components
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                textAlign: "center",
                marginBottom: "0",
              }}
            ></p>
          </Widget.Content>
        </Widget>
        {/* <Footer /> */}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/juaodantas" />
    </QuizBackground>
  );
}

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
    router.push("/quiz");
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Rick and Morty</title>
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
            <h1>Quizes da Galera</h1>
            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        {/* <Footer /> */}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/JvDantas" />
    </QuizBackground>
  );
}

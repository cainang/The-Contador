import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

const Home: NextPage = () => {
  const { loginNormal, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  async function handlerSubmit(e: FormEvent) {
    e.preventDefault();

    var data = {
      email,
      senha,
    };

    loginNormal(data);
  }

  return (
    <div id={styles.main}>
      <Head>
        <title>The Contador</title>
      </Head>

      <div id={styles.header}>
        <h1>The Contador</h1>
        <p>O app que descomplica o seu financeiro!</p>
      </div>

      <div id={styles.container}>
        <div id={styles.left}></div>
        <div id={styles.right}>
          <h1>
            Bem Vindo ao <span>The Contador</span>
          </h1>
          <p>Antes de fazer as contas, faça login!</p>

          <form onSubmit={handlerSubmit} id={styles.form}>
            <p>Email</p>
            <input
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              name="email"
              id="email"
            />
            <p>Senha</p>
            <input
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSenha(e.target.value);
              }}
              name="senha"
              id="senha"
            />

            <br />
            <br />

            <button
              className="btn"
              style={{
                background: "#FFF",
                color: "#000",
                display: "flex",
                gap: 10,
                border: "#a239ca solid 1px",
              }}
              onClick={signInWithGoogle}
            >
              <img
                width={20}
                height={20}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google"
              />{" "}
              Entrar com Google
            </button>

            <br />

            <Link href="/signin" passHref>
              <a>
                <p>Você ainda não tem um cadastro? Cadastre-se agora! 😁</p>
              </a>
            </Link>

            <br />
            <br />

            <button>
              <p>Entrar</p>
            </button>
          </form>
        </div>
      </div>

      <div id={styles.footer}>
        <div id={styles.logo}>
          <h1>The Contador</h1>
          <p>O app que descomplica o seu financeiro!</p>
        </div>
        <p>Criado por Cainã Gonçalves 💻!</p>
      </div>
    </div>
  );
};

export default Home;

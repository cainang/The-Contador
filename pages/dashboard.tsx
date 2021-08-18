import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/Dashboard.module.scss";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const { currentUser, logout } = useAuth();
  console.log(currentUser);
  const router = useRouter();

  if (!currentUser && router.isReady) {
    router.push("/");
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

      <div id={styles.aside}>
        <ul>
          <li>
            <button>
              <p>Balaço Geral</p>
            </button>
          </li>
          <li>
            <button>
              <p>Entradas</p>
            </button>
          </li>
          <li>
            <button>
              <p>Saídas</p>
            </button>
          </li>
          <li>
            <button>
              <p>Cartões</p>
            </button>
          </li>
          <li>
            <button>
              <p>Minha Conta</p>
            </button>
          </li>
          <li>
            <button onClick={logout}>
              <p>Sair</p>
            </button>
          </li>
        </ul>
      </div>

      <div id={styles.container}>
        <p>Nome: {currentUser?.name} </p>
        <img
          src={currentUser?.avatar}
          alt="avatar"
          style={{ width: 50, height: 50 }}
        />
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

export default Dashboard;

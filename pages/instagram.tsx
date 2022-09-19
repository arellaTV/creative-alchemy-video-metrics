import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"

const Instagram: NextPage = () => {
  const { data: session, status } = useSession()
  console.log({ session, status });

  return (
    <div className={styles.container}>
      <Head>
        <title>Creative Alchemy Video Metrics</title>
        <meta name="description" content="Creative Alchemy Video Metrics is a tool that lets TikTok users see metrics for their favorite videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Creative Alchemy<br />Video Metrics
        </h1>

        <p>See metrics for your Instagram Posts</p>

        <div className={styles.description}>
          Render instagram posts here
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Instagram

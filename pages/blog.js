import { useEffect, useState } from "react"
import Layout from "../components/layout"
import Post from "../components/post"
import Spinner from "../components/spinner"
import styles from "../styles/grid.module.css"

export default function Blog({posts}) {

  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if(posts) {
      setCargando(false)
    }
  }, [posts])

  return (
    <Layout
        title={'Blog'}
        description={'Blog de música, venta de guitarras, consejos, GuitarLA'}
    >
       <main className="contenedor">
        <h1 className="heading">Blog</h1>
        {cargando ? <Spinner /> : (
            <div className={styles.grid}>
              {posts?.map(post => (
                <Post
                  key={post.id}
                  post={post.attributes}
                />
              ))}
            </div>
        ) }

       </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const respuesta = await fetch(`${process.env.API_URL}/posts?populate=imagen`)
  const {data: posts} = await respuesta.json()

  return {
    props: {
      posts
    }
  }
}
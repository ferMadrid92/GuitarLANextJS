import Image from "next/image"
import Layout from "../../components/layout"
import { formatearFecha } from "../../utils/helpers"
import styles from '../../styles/blog.module.css'
import Link from "next/link"


export default function Post({post}) {
    const {titulo, contenido, imagen, publishedAt} = post[0].attributes

  return (
    <Layout
        title={titulo}
    >
        <article className={`${styles.post} ${styles['mt-3']}`}>
            <Image src={imagen.data.attributes.url} alt={`Imagen blog ${titulo}`} width={1000} height={400} />
            <div className={styles.contenido}>
                <h3>{titulo}</h3>
                <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
                <p className={styles.texto}>{contenido}</p>
            </div>
            <Link className={styles.enlace} href={'/blog'}>Regresar</Link>
        </article>

    </Layout>
  )
}


export async function getServerSideProps({query: {url}}) {
    
    const respuesta = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`)
    const {data: post} = await respuesta.json()
    return {
        props: {
            post
        }
    }
}
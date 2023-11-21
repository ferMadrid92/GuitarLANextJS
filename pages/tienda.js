import Layout from "../components/layout"
import Guitarra from "../components/guitarra"
import styles from '../styles/grid.module.css'
import { useEffect, useState } from "react"
import Spinner from "../components/spinner"

export default function Tienda({guitarras}) {

  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if(guitarras) {
      setCargando(false)
    }
  }, [guitarras])
  
  return (
    <Layout
        title={'Tienda'}
        description={'Tienda virtual. venta de guitarras, instrumentos, GuitarLA'}
    >
       <main className="contenedor">
          <h1 className="heading">Nuestra Colección</h1>
          {cargando ? <Spinner /> : (
              <div className={styles.grid}>
              {guitarras?.map(guitarra => (
                <Guitarra
                  key={guitarra.id}
                  guitarra={guitarra.attributes}
                />
              ))}
            </div>
          )}

       </main>
    </Layout>
  )
}


// export async function getStaticProps() {
//   const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`)
//   const {data: guitarras} = await respuesta.json()

//   return {
//     props: {
//       guitarras
//     }
//   }
// }

export async function getServerSideProps() {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`)
  const {data: guitarras} = await respuesta.json()

  return {
    props: {
      guitarras
    }
  }
}

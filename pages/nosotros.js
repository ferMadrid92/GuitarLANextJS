import Image from "next/image"
import Layout from "../components/layout"
import styles from "../styles/nosotros.module.css"

export default function Nosotros() {
  return (
    <Layout
        title={'Nosotros'}
        description={'Sobre nosotros, GuitarLA tienda de música'}
    >
      <main>
       <h1 className="heading">Nosotros</h1>
       <div className={styles.contenido}>
          <Image src="/img/nosotros.jpg" width={1000} height={800} alt="Imagen sobre nosotros" />

          <div>
            <p>Aenean egestas, eros ac euismod feugiat, sapien elit mollis nunc, id dictum metus nunc vitae erat. Sed eleifend nulla ut dignissim finibus. Integer ornare magna non leo dapibus, vitae condimentum felis pretium. Fusce in tortor a nisi molestie viverra. Cras cursus justo nunc, vel egestas massa consequat nec. Nulla nec bibendum ipsum. Praesent euismod nisi quis elit mattis rhoncus. Ut sit amet ultrices elit.</p>
            <p>Suspendisse potenti. Phasellus convallis porta urna nec euismod. Morbi vel lacinia massa. Sed rhoncus sodales arcu, a convallis mauris consectetur quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam ac ultricies sapien.</p>
          </div>
       </div>
      </main>
    </Layout>
  )
}

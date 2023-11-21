import {useState, useEffect} from 'react'
import Image from "next/image"
import styles from '../../styles/guitarras.module.css'
import Layout from "../../components/layout"
import Link from "next/link"
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Spinner from '../../components/spinner'

export default function Producto({guitarra, agregarCarrito}) {

    
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if(guitarra) {
      setCargando(false)
    }
  }, [guitarra])

    const [cantidad, setCantidad] = useState(0)
    const {nombre, descripcion, imagen, precio} = guitarra[0].attributes
    
    const router = useRouter()

    const handleSubmit = e => {
        e.preventDefault()
        if(cantidad < 1) {
            alert('Cantidad no válida')
            return
        }
        //Construir un objeto para almacenarlo en LocalStorage
        const guitarraSeleccionada = {
            id: guitarra[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }

        toast.success('Agregado al Carrito')
        
        //Pasando la informacion al Context
        agregarCarrito(guitarraSeleccionada)

        setTimeout(() => {
            router.back()
        }, 3000);
    }

  return (
    <Layout
        title={`Guitarra ${nombre}`}
    >
        {cargando ? <Spinner/> : (
        <>
            <div className={styles.guitarra}>

                <Image src={imagen.data.attributes.url} width={600} height={400} alt={`Imagen guitarra ${nombre}`} />

                <div className={styles.contenido}>
                    <h3 className={styles.descripcion}>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>${precio}</p>
                    <form
                        className={styles.formulario}
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="cantidad">Cantidad:</label>
                        <select
                            onChange={e => setCantidad(+e.target.value)}
                            id="cantidad"
                        >
                            <option value="0">-- Seleccione --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <input
                        type="submit"
                        value="Agregar al carrito"
                        />
                    </form>
                    <Link className={styles.regresar} href={'/tienda'}>Regresar a la Tienda</Link>
                </div>
            </div>
        </>
            )}
        
 
    </Layout>
  )
}

export async function getStaticPaths() {
    const respuesta = await fetch(`${process.env.API_URL}/guitarras`)
    const {data} = await respuesta.json()

    const paths = data.map(guitarra => ({
        params: {
            url: guitarra.attributes.url
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params: {url}}) {
    
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    const {data: guitarra} = await respuesta.json()
    return {
        props: {
            guitarra
        }
    }
}

// export async function getServerSideProps({query: {url}}) {
    
//     const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
//     const {data: guitarra} = await respuesta.json()
//     return {
//         props: {
//             guitarra
//         }
//     }
// }
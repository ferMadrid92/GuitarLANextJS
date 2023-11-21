export const formatearFecha = fecha => {
    const fechaNueva = new Date (fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const formatearNumero = numero => {
    return numero.toLocaleString('en-US')
  }
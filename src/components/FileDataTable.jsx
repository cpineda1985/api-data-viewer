// Componente principal de la tabla, incluye lógica de filtros, paginación, carga y errores
import React from 'react'
import { useEffect, useState } from 'react'
import {
  Table,
  Container,
  Form,
  Button,
  Spinner,
  Alert
} from 'react-bootstrap'

function FileDataTable () {
  // Estados principales para gestión de datos y controles, uso de hooks
  const [data, setData] = useState([])
  const [fileName, setFileName] = useState('')
  const [includeEmpty, setIncludeEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [offset, setOffset] = useState(0)
  const [limit] = useState(10)
  const [hasMore, setHasMore] = useState(true)

  // Función para obtener datos del backend con filtros y paginación
  const fetchData = async (options = {}) => {
    const {
      fileName = '',
      includeEmpty = false,
      reset = false,
      currentOffset = offset
    } = options

    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (fileName) params.append('fileName', fileName)
      if (includeEmpty) params.append('includeEmpty', 'true')
      params.append('limit', limit)
      params.append('offset', currentOffset)

      const response = await fetch(`http://localhost:3000/files/data?${params}`) //url del api backend
      if (!response.ok) {
        throw new Error('No se encontraron resultados.')
      }

      const result = await response.json()
      // de uso para que cada línea esté accesible en una sola fila de la tabla
      const newData = result.flatMap(item => item.lines?.map(line => ({ ...line, file: item.file })) || [])

      if (reset) {
        setData(newData)
      } else {
        setData(prev => [...prev, ...newData])
      }

      // Se valida si hay más datos para paginar
      setHasMore(newData.length === limit)
      setOffset(currentOffset + limit)
    } catch (err) {
      setError(err.message)
      if (reset) {
        setData([])
        setOffset(0)
        setHasMore(false)
      }
    } finally {
      setLoading(false)
    }
  }

  // Se carga por defecto la primera página al montar el componente, hook para fetch de data automatico
  useEffect(() => {
    fetchData({ reset: true, currentOffset: 0 })
  }, [])

  // Busca filtrando por fileName e incluye líneas vacías si está habilitado
  const handleSearch = () => {
    setOffset(0)
    fetchData({ fileName, includeEmpty, reset: true, currentOffset: 0 })
  }

  // Limpia filtros y reinicia la tabla
  const handleClear = () => {
    setFileName('')
    setIncludeEmpty(false)
    setOffset(0)
    fetchData({ reset: true, currentOffset: 0 })
  }

  // Alterna el checkbox para incluir líneas vacías
  const handleToggleEmpty = () => {
    const newInclude = !includeEmpty
    setIncludeEmpty(newInclude)
    setOffset(0)
    fetchData({ fileName, includeEmpty: newInclude, reset: true, currentOffset: 0 })
  }

  // Carga la siguiente página de resultados
  const handleLoadMore = () => {
    fetchData({ fileName, includeEmpty, reset: false, currentOffset: offset })
  }

  return (
    <Container className='mt-5'>
      <h2>React Test App</h2>

      {/* Filtros de búsqueda */}
      <div className='d-flex gap-2 my-3'>
        <Form.Control
          type='text'
          value={fileName}
          placeholder='Filtrar por fileName (ej. test1.csv)'
          onChange={e => setFileName(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault() // previene envío automático
              handleSearch()     // permite buscar con Enter
            }
          }}
        />
        <Button variant='secondary' onClick={handleSearch}>Buscar</Button>
        <Button variant='dark' onClick={handleClear}>Limpiar</Button>
        <Button
          variant={includeEmpty ? 'success' : 'outline-secondary'}
          onClick={handleToggleEmpty}
        >
          Incluir Vacíos
        </Button>
      </div>

      {/* Indicador de carga */}
      {loading && (
        <div className='text-center my-3'>
          <Spinner animation='border' variant='primary' /> Cargando...
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <Alert variant='warning'>{error}</Alert>
      )}

      {/* Tabla de datos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && !loading && (
            <tr>
              <td colSpan='4' className='text-center'>Sin resultados</td>
            </tr>
          )}
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.file}</td>
              <td>{row.text}</td>
              <td>{row.number}</td>
              <td>{row.hex}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botón de carga adicional */}
      {!loading && hasMore && (
        <div className='text-center my-3'>
          <Button onClick={handleLoadMore} variant='primary'>Cargar más resultados</Button>
        </div>
      )}
    </Container>
  )
}

export default FileDataTable
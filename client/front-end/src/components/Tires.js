import TiresTable from './tiresTable'
import {Container} from 'react-bootstrap'

const Tire = () => {
  return (
    <div>
      <div>
        <main className='py-3'>
          <Container>
            <TiresTable />
          </Container>
        </main>
      </div>
    </div>
  )
}

export default Tire;
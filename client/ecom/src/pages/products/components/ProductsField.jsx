import Carousel from './Carousel'

function ProductsField() {
  return (
    <>
      <div className="row w-100" style={{ 'zIndex': '1', 'display': 'flex', 'flexDirection': 'row', 'textAlign': 'start' }}>
        <div className="col p-0" >
          <Carousel />
        </div>
      </div>
    </>
  )
}

export default ProductsField
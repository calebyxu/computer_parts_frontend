import { useContext } from 'react'
import { Product } from '../pages/Products.jsx'

function ProductCard({id, name, price, image, openModel}) {
    const user = useContext(Product)

    return (
        <div class="item" id={id} onClick={openModel}>
            <h3>{name}</h3>
            <img src={image} alt="image"/>
        </div>
    )
}

export default ProductCard
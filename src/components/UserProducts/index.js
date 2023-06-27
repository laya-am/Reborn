export default function UserProducts({ products }) {
    return (
      <>
        <h3>Your Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <p>name: {product.name}</p>
              <p>added on {product.date}</p>
              <p>price: {product.price} EUR</p>
              {/* <p>description: {product.description}</p> */}
            </li>
          ))}
        </ul>
      </>
    );
  }
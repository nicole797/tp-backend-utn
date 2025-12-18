// src/layouts/Layout.jsx
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";


const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigateUser = useNavigate()

  const handleLogout = () => {
    logout()
    navigateUser("/login")
  }
  const [products, setProducts] = useState([]);

useEffect(() => {
  getProducts().then((res) => {
    if (res.success) {
      setProducts(res.data);
    }
  });
}, []);

  return (
    <>
      <header className="layout-header">
        <nav className="layout-nav">
          <Link to="/">Nuestros productos</Link>
          <Link to="/sobre-nosotros">Sobre nosotros</Link>
          <Link to="/contacto">Contactanos</Link>
          {
            !user ?
              <>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
              </>
              :
              <>
                <Link to="/agregar-producto">Agregar producto</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </>
          }
        </nav>
          <h2>Productos</h2>


      </header>

      <main className="layout-main">
        {products.length === 0 && <p>No hay productos</p>}

<ul>
  {products.map((p) => (
    <li key={p._id}>
      {p.name} - ${p.price}
    </li>
  ))}
</ul>
        {children}
      </main>

      <footer className="layout-footer">
        <p>Sitio desarrollado por UTN</p>
      </footer>
    </>
  )
}

export default Layout

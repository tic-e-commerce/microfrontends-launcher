import {
  faArrowRightFromBracket,
  faBagShopping,
  faSearch,
  faShoppingCart,
  faStar,
  faUser,
  faUserAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importar useRouter

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Usar useRouter para redirigir

  useEffect(() => {
    // Verificar si user_id y token existen en el localStorage
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!userId && !!token);
  }, []);

  const logout = () => {
    // Eliminar el user_id y token del localStorage
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Redirigir al login
    router.push("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          {/* Navbar Brand */}
          <Link href="/" className="navbar-brand fw-bold text-black">
            Exclusive
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Centered Navigation */}
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link text-black hover-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link text-black hover-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  className="nav-link text-black hover-link">
                  Contact
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link
                      href="/login"
                      className="nav-link text-black hover-link">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/register"
                      className="nav-link text-black hover-link">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex align-items-center">
              {/* Search bar */}
              <form className="position-relative me-3">
                <input
                  className="form-control pe-5"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <span
                  className="position-absolute end-0 top-50 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </form>

              {isLoggedIn && (
                <>
                  {/* Botón del carrito */}
                  <Link href="/cart" className="me-3 text-black">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                  </Link>

                  {/* Menú desplegable de la cuenta */}
                  <div className="dropdown">
                    <button
                      className="bg-primary text-white rounded-circle border-0"
                      type="button"
                      id="accountDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        cursor: "pointer",
                        height: "40px",
                        width: "40px",
                      }}>
                      <FontAwesomeIcon icon={faUser} size="lg" />
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end border-0 shadow rounded-1"
                      aria-labelledby="accountDropdown">
                      <li>
                        <Link href="/profile" className="dropdown-item">
                          <FontAwesomeIcon icon={faUserAlt} className="me-2" />
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link href="/account/orders" className="dropdown-item">
                          <FontAwesomeIcon
                            icon={faBagShopping}
                            className="me-2"
                          />
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/account/cancellations"
                          className="dropdown-item">
                          <FontAwesomeIcon icon={faXmark} className="me-2" />
                          My Cancellations
                        </Link>
                      </li>
                      <li>
                        <Link href="/account/reviews" className="dropdown-item">
                          <FontAwesomeIcon icon={faStar} className="me-2" />
                          My Reviews
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={logout}>
                          <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className="me-2"
                            rotation={180}
                          />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Columna de información */}
          <div className="col-md-6">
            <h5>MiApp</h5>
            <p>
              © {new Date().getFullYear()} MiApp. Todos los derechos reservados.
            </p>
          </div>

          {/* Columna de enlaces */}
          <div className="col-md-6 text-md-end">
            <ul className="list-unstyled d-flex justify-content-center justify-content-md-end gap-3">
              <li>
                <Link href="/" className="text-white text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white text-decoration-none">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white text-decoration-none">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

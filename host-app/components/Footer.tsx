import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row">
          {/* Columna 1: Nombre de la aplicación */}
          <div className="col-md-3 mb-4">
            <h5>Exclusive</h5>
            <p>© {new Date().getFullYear()} Exclusive. All rights reserved.</p>
          </div>

          {/* Columna 2: Support */}
          <div className="col-md-3 mb-4">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>123 Main Street, City, Country</li>
              <li>Email: support@example.com</li>
              <li>Phone: +1 234 567 890</li>
            </ul>
          </div>

          {/* Columna 3: Account */}
          <div className="col-md-3 mb-4">
            <h5>Account</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  href="/my-account"
                  className="text-white text-decoration-none">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-white text-decoration-none">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-white text-decoration-none">
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-white text-decoration-none">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-white text-decoration-none">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Quick Links */}
          <div className="col-md-3 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-white text-decoration-none">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white text-decoration-none">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white text-decoration-none">
                  Contact
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

import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "24rem" }}>
        <h1 className="text-center mb-4 text-primary">Iniciar Sesión</h1>
        <form>
          {/* Campo de Usuario */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <FontAwesomeIcon icon={faUser} className="me-2" /> Usuario Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Ingresa tu usuario"
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {/* Botón de Enviar */}
          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

import { useState } from "react";
import { LoginUser } from "@/services/auth.service";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await LoginUser(email, password);
      setSuccess("Inicio de sesión exitoso.");
      localStorage.setItem("token", response.data.token);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Error al iniciar sesión. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="w-75">
          <h1>Log in to Exclusive</h1>
          <p>
            <small>Enter you details bellow</small>
          </p>
          <form onSubmit={handleSubmit}>
            {/* Campo de Email */}
            <div className="my-5">
              <input
                type="email"
                className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                id="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo de Contraseña */}
            <div className="my-5">
              <input
                type="password"
                className="border-0 border-bottom border-2 w-100 p-2 input-border-bottom"
                id="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Botón de Enviar */}
            <div className="row my-5 align-items-center justify-content-center">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-primary w-100 text-white py-3"
                  disabled={loading}>
                  {loading ? "Loading..." : "Log in"}
                </button>
              </div>
              <div className="col-6 align-items-center d-flex justify-content-end">
                <a href="#" className="text-decoration-none text-primary p-3">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Mensaje de error */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* Mensaje de éxito */}
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

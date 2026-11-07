import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ isAuth, carregando, children }) {
  if (carregando) {
    return <div className="loading">Verificando autenticação...</div>;
  }

  if (!isAuth) {
    return <Navigate to="login" replace />;
  }

  return children;
}

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => navigate("/auth")}>Navigate</button>
    </div>
  );
};

export default Login;

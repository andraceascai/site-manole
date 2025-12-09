import { useState, type FormEvent } from "react";
import axios from "axios";
import "./Login.css";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.data.message === "Login successful") {
        localStorage.setItem("loggedIn", "true");
        onLogin();
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Eroare la server, încearcă din nou.");
      }
    }
  };

  return (
    <div className="container-login">
      <form className="form-login" onSubmit={handleSubmit}>
        <h2 className="title-login">Autentificare</h2>

        <input
          className="input-login"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-login"
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="button-login">Login</button>

        {error && <p className="error-login">{error}</p>}
      </form>
    </div>
  );
}

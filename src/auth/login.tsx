import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuthContext";
import { signIn } from "../services/api/api";
import { UserSignIn } from "../services/types/types";
import { Link } from "react-router-dom";
interface LoginProps {
  language?: string;
}

export const Login: React.FC<LoginProps> = ({ language }) => {
  const [formData, setFormData] = useState<UserSignIn>({
    name: "",
    email: "",
    password: "",
    avatar: "",
    avatarFile: { file: new File([""], "") },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      if (formData.avatarFile && formData.avatarFile.file) {
        const avatarFormData = new FormData();
        avatarFormData.append("file", formData.avatarFile.file);
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/files/upload",
          {
            method: "POST",
            body: avatarFormData,
          }
        );
        const { location } = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          avatar: location,
        }));
      } else {
        throw new Error("Please select an avatar image");
      }
      await signIn(formData);

      login(formData);
      navigate("/");
    } catch (error) {
      console.error("Error during logining:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignIn();
  };

  const handleAvatarChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const avatarFile = files[0];
      setFormData((prevData) => ({
        ...prevData,
        avatarFile: { file: avatarFile },
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <Link to="/">
        <button type="button" className="btn-close"></button>
      </Link>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2 >Sign Up</h2>
              <div className="inputbox">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="username.."
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="inputbox">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="inputbox">
                <div className="lock-closed-outline"></div>
                <div className="inputbox">
                  <div className="lock-closed-outline"></div>
                  <label htmlFor="inputPassword5" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="inputPassword5"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long
                  </div>
                </div>
              </div>
              <div className="inputbox">
                <div className="mb-3">
                  <input
                    type="file"
                    name="avatarFile"
                    className="form-control"
                    onChange={(e) => handleAvatarChange(e.target.files)}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "Log in"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

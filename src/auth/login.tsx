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
    <div className="container-login">
      <Link to="/">
        <button type="button" className="btn-close"></button>
      </Link>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <div className="inputbox">
                <div className="mb-3">
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

                  <input
                    type="password"
                    name="password"
                    placeholder="password..."
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
                    className="custum-file-upload"
                    onChange={(e) => handleAvatarChange(e.target.files)}
                  />
                </div>
              </div>
              <div className="center">
              <button type="submit" className="button-submit" disabled={loading}  style={{marginBottom: "20px"}}>
              {loading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <button style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '0.375rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500, color: '#374151', cursor: 'pointer' }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" fill="#FBBC05" />
                    <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" fill="#EB4335" />
                    <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" fill="#34A853" />
                    <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" fill="#4285F4" />
                </svg>
                <span>Continue with Google</span>
             </button>
            </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

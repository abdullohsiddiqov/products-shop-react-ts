import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/auth/useAuthContext";
import { signIn } from "../services/api/api";
import { IEntity } from "../services/types/types";

interface LoginProps {
  language?: string;
}

export const Login: React.FC<LoginProps> = ({ language }) => {
    const [formData, setFormData] = useState<IEntity.UserSignIn>({
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
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="inputbox">
              <div className="mail-outline"></div>
              <input
                type="text"
                name="name"
                className="input4"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Username</label>
            </div>
            <div className="inputbox">
              <div className="mail-outline"></div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <div className="lock-closed-outline"></div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>
            <div className="inputbox">
              <p className="forFile">Avatar</p>{" "}
              <input
                type="file"
                name="avatarFile"
                className="input4"
                onChange={(e) => handleAvatarChange(e.target.files)}
              />
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">loading...</span>
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

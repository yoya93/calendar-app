import React from "react";
import { useDispatch } from "react-redux";

import { useForm } from "../../hooks/useForm";
import "./login.css";
import { startLogin, startRegister } from "../../actions/auth";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const initialForm = {
    lEmail: "yoya@gmail.com",
    lPassword: "145ccc6",
  };

  const initialFormRegister = {
    rName: "DesdeFrontend",
    rEmail: "yoya12@gmail.com",
    rPassword1: "145ccc6",
    rPassword2: "145ccc6",
  };

  const [formLoginValues, handleLoginInputChange] = useForm(initialForm);
  const [formRegisterValues, handleRegisterInputChange] = useForm(
    initialFormRegister
  );

  const dispatch = useDispatch();

  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleLoginSubmitForm = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegisterSubmitForm = (e) => {
    e.preventDefault();
    if (rPassword1 !== rPassword2) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    dispatch(startRegister(rName, rEmail, rPassword1));
  };
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmitForm}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmitForm}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={rName}
                name="rName"
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                value={rEmail}
                name="rEmail"
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={rPassword1}
                name="rPassword1"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                value={rPassword2}
                name="rPassword2"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

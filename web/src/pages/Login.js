import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Alert, Form, Icon, Input, Typography } from "antd";

import { useAuth } from "../hooks/use-auth";
import { useState } from "react";

function Login() {
  const [error, setError] = useState(null);
  const history = useHistory();
  const { login } = useAuth();
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = async (data) => {
    setError(null);
    const response = await login(data.email, data.password);
    if (response.success) {
      // redirect to dashboard
      history.push("/");
    } else {
      setError(response.errorMsg);
    }
  };

  return (
    <div>
      <Typography.Title level={3}>Iniciar Sesión</Typography.Title>
      {error && <Alert className="login-alert" message={error} type="error" />}
      <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Item>
          <Controller
            as={
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="E-mail"
              />
            }
            type="email"
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.email && <span>Ingrese e-mail</span>}
        </Form.Item>
        <Form.Item>
          <Controller
            as={
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Contraseña"
              />
            }
            type="password"
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.password && <span>Ingrese contraseña</span>}
        </Form.Item>
        <Link to="/auth/signup">Crear cuenta</Link>
        <Form.Item>
          <button
            className="login-form-button ant-btn ant-btn-primary"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;

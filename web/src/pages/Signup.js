import { Alert, Form, Icon, Input, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { useAuth } from "../hooks/use-auth";

import NestedPhonesForm from "../components/NestedPhonesForm";

function Signup() {
  const [error, setError] = useState(null);
  const history = useHistory();
  const { register: signup } = useAuth();
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = async (data) => {
    setError(null);
    const response = await signup(data.email, data.password, data.phones);
    if (response.success) {
      // redirect to dashboard
      history.push("/");
    } else {
      setError(response.errorMsg);
    }
  };

  return (
    <div>
      <Typography.Title level={3}>Crear Cuenta</Typography.Title>
      {error && <Alert className="login-alert" message={error} type="error" />}
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && <span>This field is required</span>}
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
            rules={{
              required: true,
              pattern: /(?=^.{6,12}$)(?=.*\d{2})(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/i,
            }}
          />
          {errors.password && (
            <span>
              La contraseña debe contener; Una Mayúscula, dos números y letras
              minúsculas
            </span>
          )}
        </Form.Item>
        <Form.Item>
          <NestedPhonesForm {...{ control, register }} />
        </Form.Item>
        <Form.Item>
          <button
            className="signup-form-button ant-btn ant-btn-primary"
            type="submit"
          >
            Crear Cuenta
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;

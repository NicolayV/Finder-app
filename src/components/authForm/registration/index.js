import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/inputs";
import { UiButton } from "../../ui/buttons";
import { Form } from "../../ui/form";

import { useDispatch } from "react-redux";
import { authLogOut, authSucces } from "../../../ducks/auth";

import { getUsers, isAuthUser } from "../../../utils/storage";
import { useHistory } from "react-router-dom";

export const RegistrationForm = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = ({ login, password, email }) => {
    const users = getUsers();
    if (
      users &&
      users.find((user) => user.login === login && user.password === password)
    ) {
      isAuthUser(false);
      dispatch(authLogOut());
      setError("wasLogged");
    } else {
      users.push({ login, password, email });
      localStorage.setItem("users", JSON.stringify(users));
      isAuthUser(login);
      dispatch(authSucces({ login }));
      history.push("/main");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("login", { required: true, minLength: 6 })}
        id="login"
        type="text"
        label="Login:"
        name="login"
        placeholder="Enter your login"
        error={!!errors.login || errors.wasLogged}
        helperText={
          (errors.login?.type === "required" && (
            <span>Обязательное поле</span>
          )) ||
          (errors.login?.type === "minLength" && (
            <span>Логин больше 6 символов</span>
          )) ||
          (errors.wasLogged && <span>Такой пользователь уже есть</span>)
        }
      />
      <Input
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
        id="email"
        type="email"
        label="E-mail:"
        name="email"
        placeholder="Email@example.com"
        error={!!errors.email}
        helperText={
          (errors.email?.type === "required" && (
            <span>Обязательное поле</span>
          )) ||
          (errors.email?.type === "pattern" && (
            <span>Некорректный адрес эл.почты</span>
          ))
        }
      />

      <Input
        {...register("password", {
          required: true,
          minLength: 6,
          maxLength: 12,
        })}
        id="password"
        type="password"
        label="Password:"
        name="password"
        placeholder="Enter your password"
        error={!!errors.password}
        helperText={
          (errors.password?.type === "required" && (
            <span>Обязательное поле</span>
          )) ||
          (errors.password?.type === "minLength" && (
            <span>Пароль от 6 до 12 символов</span>
          )) ||
          (errors.password?.type === "maxLength" && (
            <span>Пароль от 6 до 12 символов</span>
          ))
        }
      />
      <Input
        {...register("confirmPassword", {
          required: true,
          validate: (value) =>
            value === password.current || <span>Пароль не совпадает</span>,
        })}
        id="confirmPassword"
        type="password"
        label="Confirm password:"
        name="confirmPassword"
        placeholder="Enter your password"
        error={!!errors.confirmPassword}
        helperText={
          (errors.confirmPassword?.type === "required" && (
            <span>Обязательное поле</span>
          )) ||
          (errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          ))
        }
      />
      <UiButton onClick={() => clearErrors("wasLogged")}>Submit</UiButton>
    </Form>
  );
};

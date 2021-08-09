import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/inputs";
import { UiButton } from "../../ui/buttons";
import { Form } from "../../ui/form";

import { useDispatch } from "react-redux";
import { authSucces } from "../../../ducks/auth";

import { useHistory } from "react-router-dom";

import { delay } from "../../../utils/helpers";
import { getUsers, isAuthUser } from "../../../utils/storage";

export const LoginForm = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [isLoging, setIsLoging] = useState(false);

  const onSubmit = ({ login, password }) => {
    setIsLoging(true);

    delay(500).then(() => {
      setIsLoging(false);
      const users = getUsers();

      const currentUser =
        users &&
        users.find(
          (user) => user.login === login && user.password === password
        );

      if (currentUser) {
        isAuthUser(login);
        dispatch(authSucces({ login }));
        console.log(login);
        history.push("/main");
      } else {
        isAuthUser(false);
        setError("auth");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("login", { required: true })}
        id="login"
        type="text"
        label="Login:"
        placeholder="Enter your login"
        error={!!errors.login || errors.auth}
        helperText={errors.login && <span>Обязательное поле</span>}
      />
      <Input
        {...register("password", { required: true })}
        id="password"
        type="password"
        label="Password:"
        placeholder="Enter your password"
        error={!!errors.password || errors.auth}
        helperText={
          (errors.password?.type === "required" && (
            <span>Обязательное поле</span>
          )) ||
          (errors.auth && <span>Неверный логин или пароль</span>)
        }
      />
      <UiButton disabled={isLoging} onClick={() => clearErrors("auth")}>
        Submit
      </UiButton>
    </Form>
  );
};

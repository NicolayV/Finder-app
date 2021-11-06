import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/inputs";
import { UiButton } from "../ui/buttons";
import { Form } from "../ui/form";
import { useDispatch } from "react-redux";
import { authLogOut, authLogIn } from "../../ducks/auth";
import { getUsersLS, setLoggedUserLS } from "../../utils/storage";
import { useHistory } from "react-router-dom";
import { delay } from "../../utils/helpers";
import { ErrorMessage } from "@hookform/error-message";

const UserForm = ({ formType }) => {
  // console.log(formType);
  let history = useHistory();
  const dispatch = useDispatch();

  const [isLoging, setIsLoging] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
  });
  console.log(errors);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = ({ login, password, email }) => {
    if (formType === "signIn") {
      setIsLoging(true);
      delay(500).then(() => {
        setIsLoging(false);
        const users = getUsersLS();
        const currentUser =
          users &&
          users.find(
            (user) => user.login === login && user.password === password
          );
        if (currentUser) {
          setLoggedUserLS(login);
          dispatch(authLogIn(login));
          history.push("/main");
        } else {
          setLoggedUserLS(false);
          setError("auth");
        }
      });
    }
    if (formType === "signUp") {
      const users = getUsersLS();
      if (
        users &&
        users.find((user) => user.login === login && user.password === password)
      ) {
        setLoggedUserLS(false);
        dispatch(authLogOut());
        setError("wasLogged");
      } else {
        users.push({ login, password, email });
        localStorage.setItem("users", JSON.stringify(users));
        setLoggedUserLS(login);
        dispatch(authLogIn(login));
        history.push("/main");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {formType === "signUp" && (
        <>
          <Input
            {...register("login", {
              required: { value: true, message: "Обязательное поле" },
              minLength: { value: 6, message: "Логин больше 6 символов" },
            })}
            id="login"
            type="text"
            label="Login:"
            name="login"
            placeholder="Enter your login"
            error={!!errors.login || errors.wasLogged}
            helperText={
              errors?.login?.message ||
              (errors.wasLogged && <span>Такой пользователь уже есть</span>)
            }
          />

          <Input
            {...register("email", {
              required: { value: true, message: "Обязательное поле" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный адрес эл.почты",
              },
              // pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
          {/* <div>
            <p>dssdf</p>
          </div> */}

          {/* <input
            {...register("singleErrorInput", {
              required: "Обязательное полеeeee",
              minLength: 6,
              maxLength: 12,
            })}
          />
          <ErrorMessage errors={errors} name="singleErrorInput" />

          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p>{message}</p>}
          /> */}

          <UiButton onClick={() => clearErrors("wasLogged")}>Submit</UiButton>
        </>
      )}
      {formType === "signIn" && (
        <>
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
        </>
      )}
    </Form>
  );
};

export default UserForm;

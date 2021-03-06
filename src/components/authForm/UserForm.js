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
              required: { value: true, message: "???????????????????????? ????????" },
              minLength: { value: 6, message: "?????????? ???????????? 6 ????????????????" },
            })}
            id="login"
            type="text"
            label="Login:"
            name="login"
            placeholder="Enter your login"
            error={!!errors.login || errors.wasLogged}
            helperText={
              errors?.login?.message ||
              (errors.wasLogged && <span>?????????? ???????????????????????? ?????? ????????</span>)
            }
          />

          <Input
            {...register("email", {
              required: { value: true, message: "???????????????????????? ????????" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "???????????????????????? ?????????? ????.??????????",
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
                <span>???????????????????????? ????????</span>
              )) ||
              (errors.email?.type === "pattern" && (
                <span>???????????????????????? ?????????? ????.??????????</span>
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
                <span>???????????????????????? ????????</span>
              )) ||
              (errors.password?.type === "minLength" && (
                <span>???????????? ???? 6 ???? 12 ????????????????</span>
              )) ||
              (errors.password?.type === "maxLength" && (
                <span>???????????? ???? 6 ???? 12 ????????????????</span>
              ))
            }
          />

          <Input
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password.current || <span>???????????? ???? ??????????????????</span>,
            })}
            id="confirmPassword"
            type="password"
            label="Confirm password:"
            name="confirmPassword"
            placeholder="Enter your password"
            error={!!errors.confirmPassword}
            helperText={
              (errors.confirmPassword?.type === "required" && (
                <span>???????????????????????? ????????</span>
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
              required: "???????????????????????? ????????eeee",
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
            helperText={errors.login && <span>???????????????????????? ????????</span>}
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
                <span>???????????????????????? ????????</span>
              )) ||
              (errors.auth && <span>???????????????? ?????????? ?????? ????????????</span>)
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

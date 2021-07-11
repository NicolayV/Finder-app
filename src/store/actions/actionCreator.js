import {
  AUTH_LOGOUT,
  AUTH_SUCCES,
  GET_MOVIE_CARD,
  GET_MOVIE_DATA_BASE,
} from "./actionTypes";

import axios from "axios";
import { useState } from "react";
import { get } from "react-hook-form";

// Action Creator
// функция которая отправляет Action редюсеру
// а редюсер интерпритирует это действие и манипулирует state-ом

// вызивается во внешнем интерфейсе movieCardDetail и принимает параметр payload и с помощью dispatch передает его в reducer кот обработывает action и вносит в state

export const movieDataBase = (payload) => {
  const fetchMovie = () => {
    const getMovies = (page) => {
      axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      );
    };
    getMovies(payload);

    return (dispatch) => {
      dispatch({
        type: GET_MOVIE_DATA_BASE,
        payload: fetchMovie(getMovies(payload)),
      });
    };
  };
};

export const movieCardDetail = (payload) => {
  return (dispatch) => {
    dispatch({
      type: GET_MOVIE_CARD,
      payload,
    });
  };
};

export const authSucces = (payload) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_SUCCES,
      payload,
    });
  };
};

export const authLogOut = () => {
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGOUT,
    });
  };
};

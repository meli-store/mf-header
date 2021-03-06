import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { routes } from "../helpers/header-helper";
import { Searchbar } from "./Searchbar";
import { getProductsByKeyword, setProducts } from "@meli-store/api";

export const Navbar = () => {

  const [data, setData] = useState({
    keyword: "",
    products: {},
    loggedIn: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    sesionHandler();
  }, [])

  useEffect(() => {
    getProductsByKeyword(data.keyword).then(({ results }) => {
      setData({ ...data, products: results });
      setProducts(results);
      navigate("/");
    });
  }, [data.keyword]);

  useEffect(() => {
    authOption = renderAuthOption();
  }, [data.loggedIn]);

  const searchHandler = (keyword) => {
    setData({ ...data, keyword });
  };

  const sesionHandler = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setData({ ...data, loggedIn: true });
    }
  }

  const closeSesionHandler = () => {
    window.localStorage.removeItem("token");
  }

  const renderAuthOption = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      return (
        <li className="nav-item" onClick={closeSesionHandler}>
          <Link
            to={"/"}
            className="nav-link"
          >
            {"Cerrar Sesión"}
          </Link>
        </li>
      )
    } else {
      return (
        <li className="nav-item" key={"/login"}>
          <NavLink
            to={"login"}
            className={({ isActive }) =>
              "nav-link " + (isActive ? "active" : "")
            }
          >
            {"Login"}
          </NavLink>
        </li>
      )
    }
  }

  let authOption = renderAuthOption();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Store
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {routes.map((route) => (
              <li className="nav-item" key={route.path}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    "nav-link " + (isActive ? "active" : "")
                  }
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
            {authOption}
          </ul>
          <Searchbar query={"Hola"} searchHandler={searchHandler} />
        </div>
      </div>
    </nav>
  );
};

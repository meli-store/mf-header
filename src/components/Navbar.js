import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../helpers/header-helper";
import { Searchbar } from "./Searchbar";
import { getProductsByKeyword } from "@meli-store/api";

export const Navbar = () => {

    const [data, setData] = useState({
        keyword: "",
        products: {}
    });

    useEffect(() => {
        getProductsByKeyword(data.keyword).then(({ results }) => {
            console.log(results)
        });
    }, [data.keyword])

    const searchHandler = (keyword) => {
        setData({ ...data, keyword })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Store</NavLink>
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
                        {
                            routes.map((route) => (
                                <li className="nav-item" key={route.path}>
                                    <NavLink to={route.path} className={({ isActive }) => "nav-link " + (isActive ? "active" : "")}>{route.name}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                    <Searchbar query={'Hola'} searchHandler={searchHandler} />
                </div>
            </div>
        </nav>
    )
}
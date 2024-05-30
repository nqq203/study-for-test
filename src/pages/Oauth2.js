import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Oauth() {
  const { setIsAuthenticated } = useAuth();
  const [authen, setAuthen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search);
  const decodedUserInfo = JSON.parse(queryParams.userInfo);
  const decodedAccessToken = JSON.parse(queryParams.accessToken);

  useEffect(() => {
    console.log(decodedAccessToken);
    console.log(decodedUserInfo);
    localStorage.setItem('accessToken', decodedAccessToken);
    localStorage.setItem('token', decodedAccessToken);
    localStorage.setItem('email', decodedUserInfo.email);
    localStorage.setItem('fullname', decodedUserInfo.fullName);
    localStorage.setItem('role', decodedUserInfo.role);
    localStorage.setItem('_id', decodedUserInfo._id);
    localStorage.setItem('role', decodedUserInfo.role);
    localStorage.setItem('typeLogin', 'oauth2');
    if (!authen) 
      setAuthen(true);
  }, [authen]);

  useEffect(() => {
    console.log("hello");
    console.log(authen);
    if (authen) {
      setIsAuthenticated(authen);
      navigate("/");
    }
  }, [authen]);
  return <div></div>
}
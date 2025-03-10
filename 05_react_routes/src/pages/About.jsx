import React from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");
  const age = params.get("age");
  return (
    <div>
      <h2>关于</h2>
      <h3>name:{name}</h3>
      <h3>age:{age}</h3>
    </div>
  );
};

export default About;

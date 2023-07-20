import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const BASE_URL = "http://localhost:8000/";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email address!").required("Required!"),
  password: Yup.string().required("Required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password doesnot match!")
    .required("Required!"),
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [passwordPreview, setPasswordPreview] = useState(false);
  const [confirmpasswordPreview, setconfirmPasswordPreview] = useState(false);

  const onSubmit = async (values, actions) => {
    let formContent = Object.assign({}, values);
    delete formContent.confirmPassword;
    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "register",
        data: formContent,
      });

      actions.setSubmitting(false);
      console.log(response);

      const data = response.data;
      if (!data.success) {
        setError(data.message);
        return false;
      }

      actions.resetForm();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <form
      className="p-10 max-w-screen-sm mt-10 mx-auto rounded-md dark:bg-[#252525] "
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-3xl font-bold mb-4 text-center text-orange-600 ">
        Register An Account
      </h1>
      <div className="form-control mb-3">
        <input
          className="block w-[90%] mx-auto px-3 py-3 rounded-md outline-none mb-3 dark:bg-gray-700 dark:text-white"
          name="name"
          type="text"
          placeholder="Full Name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm md:px-7 px-4">
            {formik.errors.name}
          </div>
        ) : null}
      </div>

      <div className="form-control mb-3">
        <input
          className="block w-[90%] mx-auto px-3 py-3 rounded-md outline-none mb-3 dark:bg-gray-700 dark:text-white"
          name="email"
          type="text"
          placeholder="Email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm md:px-7 px-4 ">
            {formik.errors.email}
          </div>
        ) : null}
      </div>

      <div className="form-control mb-3 relative">
        <input
          className="block w-[90%] mx-auto px-3 py-3 rounded-md outline-none mb-3  dark:bg-gray-700 dark:text-white"
          name="password"
          type={passwordPreview ? "text" : "password"}
          placeholder="Password"
          {...formik.getFieldProps("password")}
        />
        <div
          className="icon absolute top-3 right-10 cursor-pointer"
          onClick={() => setPasswordPreview(!passwordPreview)}
        >
          {passwordPreview ? (
            <i className="fa-solid fa-eye text-sm"></i>
          ) : (
            <i className="fa-solid fa-eye-slash text-sm"></i>
          )}
        </div>

        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm md:px-7 px-4">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="form-control mb-3 relative">
        <input
          className="block w-[90%] mx-auto px-3 py-3 rounded-md outline-none mb-3  dark:bg-gray-700 dark:text-white "
          name="confirmPassword"
          type={confirmpasswordPreview ? "text" : "password"}
          placeholder=" Confirm Password"
          {...formik.getFieldProps("confirmPassword")}
        />
        <div
          className="icon absolute top-3 right-10 cursor-pointer"
          onClick={() => setconfirmPasswordPreview(!confirmpasswordPreview)}
        >
          {confirmpasswordPreview ? (
            <i className="fa-solid fa-eye text-sm"></i>
          ) : (
            <i className="fa-solid fa-eye-slash text-sm"></i>
          )}
        </div>

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm md:px-7 px-4">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      <div className="error-box md:px-7 px-4">
        <p className="text-red-500 font-semibold text-sm">
          {error ? error : ""}
        </p>
      </div>
      <div className="grid place-items-center">
        <button
          type="submit"
          className="block w-[90%] mt-1 mx-auto px-3 py-3 rounded-md bg-orange-600 hover:bg-orange-700 hover:font-semibold dark:text-white"
        >
          Register
        </button>
      </div>
      <div className="refers grid place-items-center mt-3">
        <p className="dark:text-white">Already have an account?</p>
        <Link to="/login">
          <span className="text-orange-600">Login</span>
        </Link>
      </div>
    </form>
  );
};

export default Register;

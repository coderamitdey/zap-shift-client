import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  //  redirection
  const location = useLocation();
  const navigate = useNavigate();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegistration = async (data) => {
    try {
      const userCredential = await registerUser(
        data.email.trim(),
        data.password,
      );

      // upload photo
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`,
        formData,
      );
      const photoURL = res.data.data.url;

      // update profile
      await updateUserProfile({ displayName: data.name, photoURL });

      // add to DB
      await axiosSecure.post("/users", {
        email: data.email.trim(),
        displayName: data.name,
        photoURL,
      });

      Swal.fire("Success!", "Registration complete", "success");
      navigate(location.state || "/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire("Error!", "Email already in use", "error");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-center font-bold text-3xl">Create an accout</h1>
        <p className="font-semibold text-center">Register Now!</p>
        <div className="mt-5">
          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset">
              <label className="label">Name</label>

              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600 font-semibold">Name is required</p>
              )}
              {/* email field */}

              <label className="label">Email</label>

              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600 font-semibold">Email is required</p>
              )}

              {/* photo field */}

              <label className="label">Image</label>

              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="Your Photo"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-600 font-semibold">Photo is required</p>
              )}

              <label className="label">Password</label>

              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                })}
                className="input"
                placeholder="Password"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}

              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}

              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have at least at least one uppercase letter, at
                  least one lowercase letter, at least one number,at least one
                  special character, minimum 8 characters
                </p>
              )}

              <div>
                <a className="link link-hover font-semibold text-gray-600">
                  Forgot password?
                </a>
              </div>
              <button className="btn btn-neutral w-80 mt-4">Register</button>
            </fieldset>
            <p>
              Already have an account?
              <Link
                state={location.state}
                to="/login"
                className="text-gray-500 border-b border-dashed hover:text-pink-400 ml-2"
              >
                Login
              </Link>
            </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;

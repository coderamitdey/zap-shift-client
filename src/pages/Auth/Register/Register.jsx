import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //  redirection
  const location = useLocation();
  const navigate = useNavigate();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegistration = (data) => {
    console.log(data.photo[0]);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // render photo url for imgBB
        const formData = new FormData();
        formData.append("image", profileImg);

        const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`;

        axios.post(img_API_URL, formData).then((res) => {
          console.log(res.data.data.url);

          // update user profile
          const userProfile = {
            displayName: data.name,
            photURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("User Profile Updated Successfully");
              // redirection
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
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

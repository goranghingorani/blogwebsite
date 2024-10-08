import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Logo, Input } from "./index";
import { login } from "../store/authslice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [err, seterr] = useState("");

  const create = async (data) => {
    seterr("");
    try {
      const userdata = await authservice.createAccount(data);
      console.log(userdata);
      if (userdata) {
        const userdata = await authservice.getCurrentUser();
        if (userdata) dispatch(login(userdata));
        navigate("/");
      }
    } catch (error) {
      seterr(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {err && <p className="text-red-600 mt-8 text-center">{err}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full border-2 hover:bg-gray-400">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

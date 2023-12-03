"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const loginHandler = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullname", fullname);

    const data = await axios.post(
      "http://localhost:4000/users/register",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    try {
      alert("Login Berhasil");
      setEmail("");
      setPassword("");
      localStorage.setItem("data", JSON.stringify(data.data));
      localStorage.setItem("token", JSON.stringify(data.data.data.token));
      router.push("/login");
    } catch (error) {
      alert("Login Gagal Password atau Username salah");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center py-40">
      <div className="  bg-slate-50 item-center border-2xl border-black border-2xl w-1/3 p-20  shadow-2xl rounded-xl ">
        <form onSubmit={loginHandler}>
          <div className="">
            <label className="label font-bold ">Email</label>

            <input
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md border"
              required
            />

            <label className="label font-bold ">Fullname</label>
            <input
              value={fullname}
              type="text"
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-2 rounded-md border"
              required
            />

            <label className="label font-bold ">Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md border"
              required
            />

            <button className="rounded-xl text-white text-md bg-rose-500  w-full px-10 py-2 mt-5">
              Register
            </button>
            <p>Sudah Punya Akun ? <Link className="text-rose-500" href={`http://localhost:3000/login`}>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

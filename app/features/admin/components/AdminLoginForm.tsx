"use client";

import React, { useState } from "react";
import { Button } from "@/app/components";
import { BsArrowRight } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "react-toastify";
import {
  login,
  selectStatus,
  selectError,
} from "@/app/features/admin/slice/authSlice";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader

const InputField: React.FC<{
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, type, value, onChange }) => (
  <div className="relative mb-6 group">
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="block w-full px-0 pt-6 pb-2 text-blue-80 bg-transparent border-0 border-b-2 border-blue-80/40 focus:outline-none focus:ring-0 focus:border-yellow-base peer placeholder-transparent"
      placeholder=" "
      required
    />
    <label
      htmlFor={id}
      className="absolute left-0 -top-3.5 text-blue-80/50 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-80/30 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-80/50 peer-focus:text-sm"
    >
      {label}
    </label>
  </div>
);

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      const adminPath = process.env.NEXT_PUBLIC_ADMIN_PATH;
      const secretKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;
      if (typeof window !== "undefined") {
        window.location.href = `/${adminPath}?key=${secretKey}`;
      }
    }
  };

  React.useEffect(() => {
    if (status === "failed") {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [status, error]);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="relative">
          <Button
            type="submit"
            isInnerBgWhite={true}
            innerBorderColor="border-blue-base/70 border-solid border-[3px]"
            isInnerBorderWhite={false}
            outerBorderColor=""
            icon={status !== "loading" && <BsArrowRight />}
            outerBtnClassName="w-full"
            textColor="text-blue-base/70"
            iconColor="text-blue-base/70"
            innerBtnClassName="w-full font-bold text-lg py-3"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <ClipLoader color="#4A90E2" size={24} />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}

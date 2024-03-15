import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AddLogin } from "Api/authApi";
import { jwtDecode } from "jwt-decode";
import Loader from "components/Loader";

export default function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedRememberMe === "true" && storedEmail && storedPassword) {
      setValues({ email: storedEmail, password: storedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validation = () => {
    const newErrors = {};

    if (!values?.email) {
      newErrors.email = "Please enter a valid email address or username";
    }

    if (!values?.password || values?.password?.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function setCookie(name, value, hours) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + hours * 60 * 60 * 1000);

    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      setLoading(true);
      const body = {
        email: values?.email,
        password: values?.password,
      };
      await AddLogin(body)
        .then((res) => {
          const decoded = jwtDecode(res?.accessToken);
          setCookie("token", res?.accessToken, 24);
          localStorage.setItem("token", res?.accessToken);
          if (decoded?.role === "superadmin") {
            localStorage.setItem("role", decoded?.role);
            localStorage.setItem("usernameOrEmail", decoded?.usernameOrEmail);
          } else if (decoded?.role === "organizationuser") {
            localStorage.setItem("role", decoded?.role);
            localStorage.setItem("usernameOrEmail", decoded?.usernameOrEmail);
            localStorage.setItem("is_verified", decoded?.is_verified);
            localStorage.setItem("organizationid", decoded?.organizationid);
            localStorage.setItem(
              "organizationuserid",
              decoded?.organizationuserid
            );
          } else if (decoded?.role === "locationuser") {
            localStorage.setItem("role", decoded?.role);
            localStorage.setItem("usernameOrEmail", decoded?.usernameOrEmail);
            localStorage.setItem("is_verified", decoded?.is_verified);
            localStorage.setItem("locationid", decoded?.locationid);
            localStorage.setItem("locationuserid", decoded?.locationuserid);
            localStorage.setItem("organizationid", decoded?.organizationid);
          }
          if (localStorage.getItem("token") && localStorage.getItem("role")) {
            navigate("/dashboard");
          }
          setLoading(false);
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", values?.email);
            localStorage.setItem("rememberedPassword", values?.password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
            localStorage.removeItem("rememberMe");
          }
          setValues({});
          toast.success(res?.message);
          window.location.reload();
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err?.response?.data?.error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email / UserName*"
          placeholder="Email / UserName"
          id="email"
          type="text"
          name="email"
          value={values?.email}
          onChange={(e) => handleOnChange(e)}
          state={errors?.email && "error"}
        />
        {errors?.email && (
          <p className="text-xs text-red-500">{errors?.email}</p>
        )}

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          value={values?.password}
          onChange={(e) => handleOnChange(e)}
          state={errors?.password && "error"}
        />
        {errors?.password && (
          <p className="text-xs text-red-500">{errors?.password}</p>
        )}

        {/* Checkbox */}
        <div className="mb-4 mt-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <button
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={(e) => handleSubmit(e)}
        >
          Sign In
          {loading && <Loader height={25} width={25} />}
        </button>
      </div>
    </div>
  );
}

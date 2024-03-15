import { AddOrganizationUser } from "Api/OrganizationApi";
import { GetOrganization } from "Api/OrganizationApi";
import { AddVerifyEmail } from "Api/authApi";
import Select from "components/Select";
import Card from "components/card";
import InputField from "components/fields/InputField";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import CryptoJS from "crypto-js";
import Loader from "components/Loader";

function UserOrganizationForm({ setModal, secretKey, OrganizationUserList }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [organizationList, setOrganizationList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    organizationUserData();
  }, []);

  const organizationUserData = async () => {
    await GetOrganization({ currentPage: "", search: "" })
      .then((res) => {
        console.log("res", res);
        setOrganizationList(res?.orgData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleOnChange = (e) => {
    const { value, name, files } = e.target;
    if (name === "picture") {
      setValues({
        ...values,
        [name]: files[0],
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validation = () => {
    const newErrors = {};

    if (!values?.firstname) {
      newErrors.firstname = "Please enter your name";
    }

    if (!values?.lastname) {
      newErrors.lastname = "Please enter your name";
    }

    if (!values?.username) {
      newErrors.username = "Please enter your usename";
    }

    if (!values?.mobile_number) {
      newErrors.mobile_number = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(values?.mobile_number)) {
      newErrors.mobile_number = "Please enter your valid phone number";
    }

    if (!values?.email) {
      newErrors.email = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(values?.email)) {
      newErrors.email = "Please enter your valid email";
    }

    if (!values?.picture) {
      newErrors.picture = "Please upload your picture";
    }

    if (!values?.organizationid) {
      newErrors.organizationid = "Please enter your parentorganization";
    }

    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    const specialChar = /[$&+,:;=?@#|'<>.^*()%!-]/g;

    if (!values?.password) {
      newErrors.password = "Please enter your password";
    } else if (!values?.password?.match(lowerCase)) {
      newErrors.password = "Password should contains lowercase";
    } else if (!values?.password?.match(upperCase)) {
      newErrors.password = "Password should contains uppercase";
    } else if (!values?.password?.match(numbers)) {
      newErrors.password = "Password should contains numbers";
    } else if (values?.password?.length < 8) {
      newErrors.password = "Password should be more than 8 ";
    } else if (!values?.password.match(specialChar)) {
      newErrors.password = "Password should contains specialChar";
    }

    if (!values?.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values?.confirmPassword !== values?.password) {
      newErrors.confirmPassword = "Confirm password do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const encryptEmail = (email) => {
    const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
    return encryptedEmail;
  };

  const VerifyEmail = async (email) => {
    const encryptedEmail = encryptEmail(email);
    const body = {
      email: encryptedEmail,
      role: "organizationuser",
    };
    await AddVerifyEmail(body)
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (validation()) {
      setLoading(true);
      var formdata = new FormData();
      formdata.append("firstname", values?.firstname);
      formdata.append("username", values?.username);
      formdata.append("lastname", values?.lastname);
      formdata.append("email", values?.email);
      formdata.append("mobile_number", "+1" + values?.mobile_number);
      formdata.append("password", values?.password);
      formdata.append("confirmPassword", values?.confirmPassword);
      formdata.append("organizationid", values?.organizationid);
      formdata.append("picture", values?.picture);

      // organizationid: selectedId ? selectedId : values?.organizationid,

      await AddOrganizationUser(formdata)
        .then((res) => {
          console.log("res", res);
          toast.success(res?.message);
          setValues({
            firstname: "",
            username: "",
            lastname: "",
            email: "",
            mobile_number: "",
            password: "",
            confirmPassword: "",
            organizationid: "",
            picture: "",
          });
          VerifyEmail(values?.email);
          OrganizationUserList();
          setLoading(false);
          setModal(false);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err?.response?.data?.error);
          setLoading(false);
        });
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2  mt-8">
        <div className="flex justify-end">
          <MdClose
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            size={24}
            onClick={handleClose}
          />
        </div>
        <form className="p-5">
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="First Name*"
                      placeholder="Enter Your Name"
                      id="name"
                      type="text"
                      name="firstname"
                      value={values?.firstname}
                      state={errors?.firstname && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.firstname && (
                      <p className="text-xs text-red-500">
                        {errors?.firstname}
                      </p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Last Name*"
                      placeholder="Enter Your Name"
                      id="name"
                      type="text"
                      name="lastname"
                      value={values?.lastname}
                      state={errors?.lastname && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.lastname && (
                      <p className="text-xs text-red-500">{errors?.lastname}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Username*"
                      placeholder="Enter Your Username"
                      id="username"
                      type="text"
                      name="username"
                      value={values?.username}
                      state={errors?.username && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />
                    {errors?.username && (
                      <p className="text-xs text-red-500">{errors?.username}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Email*"
                      placeholder=" Enter Your Email"
                      onChange={(e) => handleOnChange(e)}
                      id="email"
                      type="text"
                      name="email"
                      value={values?.email}
                      state={errors?.email && "error"}
                    />

                    {errors?.email && (
                      <p className="text-xs text-red-500">{errors?.email}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Password*"
                    placeholder="Password"
                    id="password"
                    type="password"
                    name="password"
                    value={values?.password}
                    state={errors?.password && "error"}
                    onChange={(e) => handleOnChange(e)}
                  />

                  {errors?.password && (
                    <p className="text-xs text-red-500">{errors?.password}</p>
                  )}
                </div>

                <div class="sm:col-span-3">
                  <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Confirm Password*"
                    placeholder="Confirm Password"
                    id="password"
                    type="password"
                    name="confirmPassword"
                    value={values?.confirmPassword}
                    state={errors?.confirmPassword && "error"}
                    onChange={(e) => handleOnChange(e)}
                  />

                  {errors?.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors?.confirmPassword}
                    </p>
                  )}
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Phone Number*"
                      placeholder="Enter Your phone number"
                      id="phone number"
                      type="text"
                      name="mobile_number"
                      value={values?.mobile_number}
                      state={errors?.mobile_number && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.mobile_number && (
                      <p className="text-xs text-red-500">
                        {errors?.mobile_number}
                      </p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Upload Picture*"
                      placeholder="upload picture"
                      id="picture"
                      type="file"
                      name="picture"
                      onChange={(e) => handleOnChange(e)}
                      state={errors?.picture && "error"}
                    />

                    {errors?.picture && (
                      <p className="text-xs text-red-500">{errors?.picture}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <Select
                      variant="auth"
                      extra="mb-3"
                      label="Parent Organization*"
                      id="parentorganization"
                      type="text"
                      name="organizationid"
                      value={values?.organizationid}
                      state={errors?.organizationid && "error"}
                      onChange={(e) => handleOnChange(e)}
                      options={organizationList}
                      valueKey="organizationid"
                      valueName="name"
                    />

                    {errors?.organizationid && (
                      <p className="text-xs text-red-500">
                        {errors?.organizationid}
                      </p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    {values?.picture && (
                      <img
                        src={
                          values?.picture
                            ? URL.createObjectURL(values?.picture)
                            : ""
                        }
                        alt="picture"
                        style={{ width: 100, height: 100 }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              class="flex rounded-md bg-indigo-600 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleOnSubmit(e)}
            >
              Submit
              {loading && <Loader height={25} width={25} />}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default UserOrganizationForm;

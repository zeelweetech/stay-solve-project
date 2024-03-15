import { AddLocation } from "Api/LocationApi";
import Loader from "components/Loader";
import Select from "components/Select";
import Card from "components/card";
import InputField from "components/fields/InputField";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

function LocationForm({ setModal, LocationList, organizationList }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validation = () => {
    const newErrors = {};

    if (!values?.name) {
      newErrors.name = "Please enter your name";
    }

    if (!values?.username) {
      newErrors.username = "Please enter your useName";
    }

    if (!values?.phone_number) {
      newErrors.phone_number = "Please enter your phone number";
    } else if (!/^\d{10}$/.test(values?.phone_number)) {
      newErrors.phone_number = "Please enter your valid phone number";
    }

    if (!values?.email) {
      newErrors.email = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(values?.email)) {
      newErrors.email = "Please enter your valid email";
    }

    if (!values?.address_line1) {
      newErrors.address_line1 = "Please enter your address";
    }

    if (!values?.city) {
      newErrors.city = "Please enter your city";
    }

    if (!values?.state) {
      newErrors.state = "Please enter your state";
    }

    if (!values?.organizationid) {
      newErrors.organizationid = "Please enter your parentorganization";
    }

    if (!values?.zip_code) {
      newErrors.zip_code = "Please enter your zipcode";
    } else if (!/^\d{5}$/.test(values?.zip_code)) {
      newErrors.zip_code = "Please enter your valid zipcode";
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
      newErrors.password = "Password should contains upperCase";
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      setLoading(true);
      const body = {
        name: values?.name,
        username: values?.username,
        phone_number: "+1" + values?.phone_number,
        email: values?.email,
        password: values?.password,
        confirmPassword: values?.confirmPassword,
        address_line1: values?.address_line1,
        address_line2: values?.address_line2,
        state: values?.state,
        city: values?.city,
        zip_code: values?.zip_code,
        notes: values?.notes,
        organizationid: values?.organizationid,
      };
      await AddLocation(body)
        .then((res) => {
          console.log("res", res);
          toast.success(res?.message);
          setValues({
            name: "",
            username: "",
            phone_number: "",
            email: "",
            password: "",
            confirmPassword: "",
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            zip_code: "",
            notes: "",
            organizationid: "",
          });
          setModal(false);
          setLoading(false);
          LocationList();
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
                      label="  Name*"
                      placeholder=" Enter Your Name"
                      id="name"
                      type="text"
                      name="name"
                      value={values?.name}
                      state={errors?.name && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.name && (
                      <p className="text-xs text-red-500">{errors?.name}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Username*"
                      placeholder=" Enter Your Username"
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
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Phone Number*"
                      placeholder="Enter Your phone number"
                      id="phone number"
                      type="text"
                      name="phone_number"
                      value={values?.phone_number}
                      state={errors?.phone_number && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.phone_number && (
                      <p className="text-xs text-red-500">
                        {errors?.phone_number}
                      </p>
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
                      label=" Address Line 1*"
                      placeholder="Enter Your Address 1"
                      id="addressline1"
                      type="text"
                      name="address_line1"
                      value={values?.address_line1}
                      state={errors?.address_line1 && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.address_line1 && (
                      <p className="text-xs text-red-500">
                        {errors?.address_line1}
                      </p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label=" Address Line 2"
                      placeholder="Enter Your Address 2"
                      id="addressline2"
                      type="text"
                      name="address_line2"
                      value={values?.address_line2}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                </div>

                <div class="sm:col-span-2 sm:col-start-1">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="City*"
                      placeholder="Enter Your City"
                      id="city"
                      type="text"
                      name="city"
                      value={values?.city}
                      state={errors?.city && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.city && (
                      <p className="text-xs text-red-500">{errors?.city}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label=" State*"
                      placeholder="Enter Your State"
                      id="state"
                      type="text"
                      name="state"
                      value={values?.state}
                      state={errors?.state && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.state && (
                      <p className="text-xs text-red-500">{errors?.state}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Zip/Post code*"
                      placeholder="Enter Your zipcode"
                      id="zipcode"
                      type="text"
                      name="zip_code"
                      value={values?.zip_code}
                      state={errors?.zip_code && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.zip_code && (
                      <p className="text-xs text-red-500">{errors?.zip_code}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Notes"
                      placeholder="Enter Notes"
                      id="addresnotesslincitye2"
                      type="text"
                      name="notes"
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.notes && (
                      <p className="text-xs text-red-500">{errors?.notes}</p>
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
                      type="select"
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

export default LocationForm;

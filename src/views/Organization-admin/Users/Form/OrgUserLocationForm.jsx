import Card from "components/card";
import InputField from "components/fields/InputField";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

function OrgUserLocationForm({ setLocationModal }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });

    console.log("Updated values:", { ...values, [name]: value });
  };

  const validation = () => {
    const newErrors = {};

    if (!values?.firstname) {
      newErrors.firstname = "Please enter your first name";
    }

    if (!values?.lastname) {
        newErrors.lastname = "Please enter your last name";
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

    // if (!values?.address_line1) {
    //   newErrors.address_line1 = "Please enter your address";
    // }

    // if (!values?.address_line2) {
    //   newErrors.address_line2 = "error";
    // }

    // if (!values?.city) {
    //   newErrors.city = "Please enter your city";
    // }

    // if (!values?.state) {
    //   newErrors.state = "Please enter your state";
    // }

    if (!values?.picture) {
      newErrors.picture = "Please upload your picture";
    }

    if (!values?.locationid) {
      newErrors.locationid = "Please enter your parentlocation";
    }

    // if (!values?.zip_code) {
    //   newErrors.zip_code = "Please enter your zipcode";
    // } else if (!/^\d{6}$/.test(values?.zip_code)) {
    //   newErrors.zip_code = "Please enter your valid zipcode";
    // }

    // if (editData?.organizationid) {
    // } else {
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
    // }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (validation()) {
      console.log("done$$$");
    }
  };

  const handleClose = () => {
    setLocationModal(false);
  };

  console.log("errors", errors);

  return (
    <div>
      <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2  mt-8">
        <div className="flex justify-end">
          <MdClose
            className="cursor-pointer text-gray-600"
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
                      placeholder="Enter Your First Name"
                      id="firstname"
                      type="text"
                      name="firstname"
                      value={values?.firstname}
                      state={errors?.firstname && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.firstname && (
                      <p className="text-xs text-red-500">{errors?.firstname}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Last Name*"
                      placeholder="Enter Your Last Name"
                      id="lastname"
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
                    id="confirmPassword"
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
                      label="Upload Picture*"
                      placeholder="upload picture"
                      id="picture"
                      type="file"
                      name="picture"
                      onChange={(e) => handleOnChange(e)}
                      state={errors?.picture && "error"}
                      style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
                    />

                    {errors?.picture && (
                      <p className="text-xs text-red-500">{errors?.picture}</p>
                    )}
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <div class="mt-2">
                    <InputField
                      variant="auth"
                      extra="mb-3"
                      label="Parent Location*"
                      id="parentlocation"
                      type="text"
                      name="locationid"
                      value={values?.locationid}
                      state={errors?.locationid && "error"}
                      onChange={(e) => handleOnChange(e)}
                    />

                    {errors?.locationid && (
                      <p className="text-xs text-red-500">
                        {errors?.locationid}
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
              class="rounded-md bg-indigo-600 px-10 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleOnSubmit(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default OrgUserLocationForm;

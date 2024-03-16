import axios from "axios";

export async function AddOrganization(body) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/add/organization`,
      body,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function GetOrganization({
  currentPage: currentPage,
  search: search,
}) {
  try {
    if (currentPage) {
      const response = await axios.get(
        search
          ? `${process.env.REACT_APP_LOCAL_URL}/organizationlist/get?page=${currentPage}&pageSize=10&search=${search}`
          : `${process.env.REACT_APP_LOCAL_URL}/organizationlist/get?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/organizationlist/get`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

export async function AddOrganizationUser(body) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/add/organization/user`,
      body,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function GetOrganizationUser(currentPage) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/organization/users?page=${currentPage}&pageSize=10`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function GetOrganizationUserListData({
  id: id,
  currentPage: currentPage,
}) {
  try {
    if (currentPage) {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/particularorganization/users/${id}?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/particularorganization/users/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

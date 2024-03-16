import axios from "axios";

export async function AddLocation(body) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/add/location`,
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

export async function GetLocation({
  currentPage: currentPage,
  search: search,
}) {
  try {
    if (currentPage) {
      const response = await axios.get(
        search
          ? `${process.env.REACT_APP_LOCAL_URL}/locationlist/get?page=${currentPage}&pageSize=10&search=${search}`
          : `${process.env.REACT_APP_LOCAL_URL}/locationlist/get?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/locationlist/get`,
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

export async function GetLocationUser(currentPage) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/location/users?page=${currentPage}&pageSize=10`,
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

export async function AddLocationUser(body) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/add/location/user`,
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

export async function GetLocationListData({
  id: id,
  currentPage: currentPage,
  search: search,
}) {
  try {
    if (currentPage) {
      const response = await axios.get(
        search
          ? `${process.env.REACT_APP_LOCAL_URL}/locationlist/get/org/${id}?page=${currentPage}&pageSize=10&search=${search}`
          : `${process.env.REACT_APP_LOCAL_URL}/locationlist/get/org/${id}?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/locationlist/get/org/${id}`,
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

export async function GetLocationUserListData({
  id: id,
  currentPage: currentPage,
  search: search,
}) {
  try {
    if (currentPage) {
      const response = await axios.get(
        search
          ? `${process.env.REACT_APP_LOCAL_URL}/get/organization/location/users/${id}?page=${currentPage}&pageSize=10&search=${search}`
          : `${process.env.REACT_APP_LOCAL_URL}/get/organization/location/users/${id}?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/organization/location/users/${id}`,
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

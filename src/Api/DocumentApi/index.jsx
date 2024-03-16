import axios from "axios";

// Documents Upload Api
export async function AddDocuments(body) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/upload/file`,
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

export async function GetDocuments({ id: id, currentPage: currentPage }) {
  try {
    if (currentPage) {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/orguser/filedata/${id}?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/orguser/filedata/${id}`,
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

// textfile api
export async function GetTextFile({ id: id, currentPage: currentPage }) {
  try {
    if (currentPage) {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/textFiles/org/${id}?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/textFiles/org/${id}`,
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

export async function GetDateFileData({
  id: id,
  currentPage: currentPage,
  startDate: startDate,
  endDate: endDate,
}) {
  try {
    if (currentPage) {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/textFiles/org/start-end/${id}?page=${currentPage}&pageSize=10&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_URL}/get/textFiles/org/start-end/${id}?startDate=${startDate}&endDate=${endDate}`,
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

export async function GetLocationDocuments({ id: id }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/orgwise/location/filedata/${id}`,
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

export async function GetSelectedLocationDocuments({ id: id }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/location/filedata/${id}`,
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

export async function GetLocationUserDocuments({ id: id }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/locationuser/filedata/${id}`,
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

export async function GetLocationTextFileData({ id: id }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/orgwise/location/textfiledata/${id}`,
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

export async function GetSelectedLocationTextFileData({ id: id }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/location/textfiledata/${id}`,
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

export async function GetLocationUserTextFileData({ id: id }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/textFiles/location/${id}`,
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

export async function GetPerticulerLocationUserData({ id: id }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/get/particularlocation/users/${id}`,
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

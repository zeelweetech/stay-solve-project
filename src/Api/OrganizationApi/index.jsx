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
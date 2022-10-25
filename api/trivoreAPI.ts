import axios from "axios";

const baseUrl = "https://devel3.t5.fi/api/rest/v1";

//prettier-ignore
type FetchUser = (accessToken: string, userId: string) => Promise<UserData | undefined>;
//prettier-ignore
type EditUser = (accessToken:string, userId:string, user:UserData) => Promise<UserData | undefined>

const fetchUser: FetchUser = async (accessToken, userId) => {
  try {
    const res = await axios.get(`${baseUrl}/user/${userId}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const editUser: EditUser = async (accessToken, userId, user) => {
  try {
    const res = await axios.put(`${baseUrl}/user/${userId}/profile`, user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default {
  fetchUser,
  editUser,
};

import { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import trivoreAPI from "../api/trivoreAPI";

type HomeProps = {
  user: UserData | null;
};

const Home: NextPage<HomeProps> = ({ user }) => {
  const [userData, setUserData] = useState(user);

  return (
    <div className="h-screen bg-[#0D1117] w-screen text-white text-opacity-80 flex items-center justify-center font-semibold">
      <div className="bg-[#0D1117] flex flex-col w-[400px] p-8 rounded-xl border border-[#30363D] items-center">
        {user ? (
          <Profile setUserData={setUserData} user={userData} />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const session = getSession(req, res);
    const user = await trivoreAPI.fetchUser(accessToken!, session!.user.sub);

    return {
      props: {
        user: user || null,
      },
    };
  } catch (err) {
    return {
      props: {
        user: null,
      },
    };
  }
};

export default Home;

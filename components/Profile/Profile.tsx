import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Avatar from "../Avatar/Avatar";
import axios from "axios";

type ProfileProps = {
  user: UserData | null;
  setUserData: (userData: UserData) => void;
};

const Profile = ({ user, setUserData }: ProfileProps) => {
  if (!user) return null;

  const [givenName, setGivenName] = useState(user.name.givenName);
  const [familyName, setFamilyName] = useState(user.name.familyName);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const sessionUser = useUser();
  const userId = sessionUser.user?.sub;

  const saveChanges = async () => {
    try {
      const res: { data: UserData } = await axios.post(`/api/users/${userId}`, {
        ...user,
        name: { givenName, familyName },
      });

      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col relative w-full">
      <div className="mb-4">
        <div className="flex items-center">
          <Avatar
            onClick={() => setOptionsVisible((p) => !p)}
            displayLetter={user.name.givenName[0]}
          />
          <p className="ml-4">
            {user.name.givenName} {user.name.familyName}
          </p>
        </div>
        {optionsVisible && (
          <div className="bg-[#0d1117] rounded-lg absolute border border-[#30363d] p-1 mt-2">
            <button className="py-2 px-4 rounded-md hover:bg-red-500">
              <a href="/api/auth/logout">Kirjaudu ulos</a>
            </button>
          </div>
        )}
      </div>
      <label className="mb-1 ml-1">Etunimi</label>
      <input
        value={givenName}
        onChange={(e) => setGivenName(e.target.value)}
        className="bg-[#010409] border border-[#30363D] rounded-lg focus:bg-[#0D1117] mb-2 p-2"
      />
      <label className="mb-1 ml-1">Sukunimi</label>
      <input
        value={familyName}
        onChange={(e) => setFamilyName(e.target.value)}
        className="bg-[#010409] border border-[#30363D] rounded-lg focus:bg-[#0D1117] mb-4 p-2"
      />
      <button
        onClick={saveChanges}
        className="bg-[#4f46e5] ml-auto rounded-lg py-2 px-4 flex-start hover:bg-opacity-80"
      >
        Tallenna muutokset
      </button>
    </div>
  );
};

export default Profile;

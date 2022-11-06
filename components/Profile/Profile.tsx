import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Avatar from "../Avatar/Avatar";
import axios from "axios";
import { useNotificationStore } from "../../store/notificationStore";

const isoStringToday = () => new Date().toISOString().split("T")[0];

type ProfileProps = {
  user: UserData | null;
  setUserData: (userData: UserData) => void;
};

const Profile = ({ user, setUserData }: ProfileProps) => {
  if (!user) return null;

  const [givenName, setGivenName] = useState(user.name.givenName);
  const [familyName, setFamilyName] = useState(user.name.familyName);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const notify = useNotificationStore((store) => store.notify);

  const sessionUser = useUser();
  const userId = sessionUser.user?.sub;

  const saveChanges = async () => {
    try {
      const { data }: { data: UserData } = await axios.post(
        `/api/users/${userId}`,
        {
          ...user,
          dateOfBirth,
          name: { givenName, familyName },
        }
      );

      setUserData(data);
      notify({ message: "Muutokset tallennettu.", type: "success" });
      notify({ message: "Error näyttää tältä.", type: "error" });
    } catch (err) {
      notify({ message: "Jokin meni vikaan.", type: "error" });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-4">
        <div className="flex items-center">
          <Avatar
            onClick={() => setOptionsVisible((p) => !p)}
            displayLetter={user.name.givenName[0]}
          />
          <p className="ml-4 flex items-center">
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
      <label className="mb-1 ml-1">Syntymäaika</label>
      <input
        type="date"
        value={dateOfBirth}
        min="1920-01-01"
        max={isoStringToday()}
        onChange={(e) => setDateOfBirth(e.target.value)}
        className="bg-[#010409] border border-[#30363D] mb-4 p-2 rounded-lg cursor-pointer focus:bg-[#0D1117] mr-auto"
      />
      <button
        onClick={saveChanges}
        className="bg-[#4f46e5] ml-auto rounded-lg py-2 px-4 hover:bg-opacity-80"
      >
        Tallenna muutokset
      </button>
    </div>
  );
};

export default Profile;

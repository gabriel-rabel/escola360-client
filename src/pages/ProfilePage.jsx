import api from "../axios/api";
import { useState, useEffect } from "react";

function ProfilePage() {
   const [user, setUser] = useState({});

   const id_user = localStorage.getItem("userId");

   useEffect(() => {
      async function getProfile() {
         try {
            const response = await api.get("/user/profile");
            setUser(response.data);
         } catch (error) {
            console.log(error);
         }
      }

      getProfile();
   }, []);

   return (
      <div>
         <h1>PROFILE</h1>
         <h1>{user.name}</h1>
      </div>
   );
}

export default ProfilePage;

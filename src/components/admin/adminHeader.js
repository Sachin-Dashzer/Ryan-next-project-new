import React from "react";
import LogoutButton from "../logoutBtn";

const adminHeader = ({ title }) => {
  return (
    <div>
      <main className="flex-grow p-6 ">
        <div className="flex justify-between items-center mb-6 pb-3 border-b-[1px] ">
          <h1 className="text-2xl font-semibold">👨‍💻 Admin {title}</h1>
          <LogoutButton />
        </div>
      </main>
    </div>
  );
};

export default adminHeader;

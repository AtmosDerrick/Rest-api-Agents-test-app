import { FC } from "react";
import React from "react";
import "./Navbar.css";
import AddAgent from "../AddAgent/AddAgent";

interface INavbar {
  search: string;
  setSearch: (value: string) => void;
}

const Navbar: FC<INavbar> = ({ search, setSearch }) => {
  return (
    <div className="w-full flex justify-between items-center  bg-blue-200 px-2 py-4">
      <h2 className="w-full font-medium ">Agent</h2>
      <div className="w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
          className="w-3/4 p-2  rounded-md"
        />
      </div>
      <div className="w-full flex justify-end ">
        <AddAgent text="Add Agent" />
      </div>
    </div>
  );
};

export default Navbar;

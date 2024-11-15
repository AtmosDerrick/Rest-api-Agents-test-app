import React, { FC, useState } from "react";
import { IAddAgent } from "../../types/Agent";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
  },
};

interface AddAgentProps {
  text: string;
}

const AddAgent: FC<AddAgentProps> = ({ text }) => {
  const [formData, setFormData] = useState<IAddAgent>({
    firstName: "",
    lastName: "",
    photoUrl: "",
    agentLicence: "",
    address: "",
    practiceAreas: "",
    aboutMe: "",
  });

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/agent", formData);
      if (response.status === 201) {
        alert("Agent created successfully!");
        closeModal(); // Close modal on success
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create agent. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={openModal} className="py-2 px-6 bg-green-600 rounded-md">
        {text}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Agent">
        <div className="w-full flex justify-between gap-x-12 items-center px-4">
          <h2 className="text-2xl font-semibold">Add New Agent</h2>
          <div>
            <button
              onClick={closeModal}
              className="text-xl text-red-600 hover:opacity-50">
              X
            </button>
          </div>
        </div>
        <form className="w-full   p-4 bg-white rounded-lg">
          <div className="w-full flex justify-between gap-x-12">
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-x-12">
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="photoUrl">
                Photo URL
              </label>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                placeholder="Photo URL"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Agent Licence */}
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="agentLicence">
                Agent Licence
              </label>
              <input
                type="text"
                name="agentLicence"
                value={formData.agentLicence}
                onChange={handleChange}
                placeholder="Agent Licence"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-x-12">
            {/* Address */}
            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="practiceAreas">
                Practice Areas
              </label>
              <input
                type="text"
                name="practiceAreas"
                value={formData.practiceAreas}
                onChange={handleChange}
                placeholder="Practice Areas (separate by commas)"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="aboutMe">
              About Me
            </label>
            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              placeholder="About Me"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              rows={3}></textarea>
          </div>

          <button
            onClick={onSubmit}
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddAgent;

import type { FC } from "react";
import { IAgent } from "../../types/Agent";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";

import "./Agent.css";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
  },
};

interface IReviews {
  id: string;
  message: string;
  createdAt: string;
}

const Agent: FC<{ agent: IAgent }> = ({ agent }) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [singleAgent, setSingleAgent] = useState<IAgent>({
    id: "",
    firstName: "",
    lastName: "",
    photoUrl: "",
    agentLicence: "",
    address: "",
    practiceAreas: [],
    aboutMe: "",
  });
  const [reviews, setReviews] = useState<IReviews[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/agent/${agent.id}/reviews`);
        setReviews(response.data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (agent.id) {
      fetchReviews();
    }
  }, []);

  async function openModal(id: string) {
    try {
      // Fetching agent details by the passed `agent.id`
      const response = await axios.get(`/agents/${id}`);
      setSingleAgent(response.data.data);

      const reviewResponse = await axios.get(`/agent/${id}/reviews`);
      setReviews(reviewResponse.data.data);
      setIsOpen(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function postReview(id: string) {
    try {
      const response = await axios.post(`/agent/review/${id}`, { message });
      if (response.status === 201) {
        alert("Review posted successfully!");

        const newReview = {
          id: response.data.id,
          message,
          createdAt: new Date().toISOString(),
        };
        setReviews((prevReviews) => [newReview, ...prevReviews]);
        setMessage("");
      } else {
        alert("Failed to post review. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while posting the review.");
      console.error(error);
    }
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Agent">
        <div className="w-full flex justify-between gap-x-12 items-center px-4 mb-8 border-b-[1px] border-b-gray-200 pb-4">
          <h2 className="text-2xl font-semibold">Agent Details</h2>
          <div>
            <button
              onClick={closeModal}
              className="text-xl text-red-600 hover:opacity-50">
              X
            </button>
          </div>
        </div>
        <div className="avatar-holder flex justify-start items-center gap-x-12 ">
          <div>
            <img
              src={singleAgent.photoUrl}
              className="w-32 border-[1px]  border-gray-300 h-32 rounded-full text-center  text-gray-300"
              alt={singleAgent.firstName}
            />
          </div>
          <div className="">
            <h2 className="text-xl font-medium">
              {singleAgent.firstName.toLocaleUpperCase()}{" "}
              {singleAgent.lastName.toLocaleUpperCase()}
            </h2>
            <h3 className="text-base text-gray-600 font-semibold py-1">
              Address:{" "}
              <span className="text-blue-700">{singleAgent.address}</span>
            </h3>
            <h3 className="text-base text-gray-600 font-semibold py-1">
              Agent Licence:{" "}
              <span className="text-blue-700">{singleAgent.agentLicence}</span>
            </h3>
            <h3 className="text-base text-gray-600 font-semibold py-1">
              Practice Area:{" "}
              <span className="text-blue-700">{singleAgent.practiceAreas}</span>
            </h3>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-base text-gray-600 leading-6 text-justify">
            {singleAgent.aboutMe}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold my-4 ">Reviews</h3>
          {reviews && reviews.length !== 0 ? (
            <ul className="px-4">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="list-disc text-base text-gray-600 border-gray-200 border-b-[1px] pb-4">
                  {review.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
          <div className="mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              placeholder="Post your review"
            />
            <button
              onClick={() => {
                postReview(singleAgent.id);
              }}
              className="ml-8 text-center bg-primary py-2 px-6 rounded-md">
              Post
            </button>
          </div>
        </div>
      </Modal>
      <div
        className="shadow-md  hover:opacity-65"
        onClick={() => {
          openModal(agent.id);
        }}>
        <header>
          <div className="avatar-holder flex justify-center items-center">
            <img
              src={agent.photoUrl}
              className="w-32 border-[1px] border-gray-300 h-32 rounded-full text-center  text-gray-300"
              alt={agent.firstName}
            />
          </div>
          <h2 className="agent-name px-4">
            {agent.firstName + " " + agent.lastName}
          </h2>
        </header>
        <div className="body line-clamp-5 px-4">{agent.aboutMe}</div>
        <footer className="px-4 ">
          <div className="full-width-flex-box">
            <div className="one-third-flex-box">
              <span>{agent.address}</span>
            </div>
            <div className="one-third-flex-box ">
              <span>Areas of Practice: {agent.practiceAreas}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Agent;

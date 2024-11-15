const express = require("express");
const { Agent, Review } = require("./model");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/agents", async (req, res, next) => {
  const agents = await Agent.findAll();
  return res.json(agents);
});

app.get("/agents/:id", async (req, res) => {
  try {
    const agentId = req.params.id;

    const agent = await Agent.findByPk(agentId);

    if (!agent) {
      return res
        .status(404)
        .json({ status: "error", message: "Agent not found" });
    }

    return res.status(200).json({ status: "ok", data: agent });
  } catch (err) {
    console.error("Error fetching agent:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

app.post("/agent", async (req, res) => {
  const {
    firstName,
    lastName,
    photoUrl,
    agentLicence,
    address,
    practiceAreas,
    aboutMe,
  } = req.body;

  console.log(req.body);
  try {
    if (
      !firstName ||
      !lastName ||
      !agentLicence ||
      !address ||
      !practiceAreas
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing fields" });
    }

    const agent = await Agent.create({
      firstName,
      lastName,
      photoUrl,
      agentLicence,
      address,
      practiceAreas,
      aboutMe,
    });

    return res.status(201).json({
      status: "ok",
      message: "Agent created successfully",
      data: agent,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

app.post("/agent/review/:id", async (req, res) => {
  const agentId = req.params.id;
  const { message } = req.body;

  try {
    // Check if message is provided
    if (!message) {
      return res
        .status(400)
        .json({ status: "error", message: "Message is required" });
    }

    // Check if the agent exists
    const agent = await Agent.findByPk(agentId);
    if (!agent) {
      return res
        .status(404)
        .json({ status: "error", message: "Agent not found" });
    }

    // Create the review
    const review = await Review.create({
      agentId,
      message,
    });

    return res.status(201).json({
      status: "ok",
      message: "Review created successfully",
      data: review,
    });
  } catch (err) {
    console.error("Error creating review:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

app.get("/agent/:id/reviews", async (req, res) => {
  const agentId = req.params.id;

  try {
    const agent = await Agent.findByPk(agentId);
    if (!agent) {
      return res
        .status(404)
        .json({ status: "error", message: "Agent not found" });
    }

    const reviews = await Review.findAll({
      where: { agentId: agentId },
    });

    return res.status(200).json({
      status: "ok",
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
});

module.exports = app;

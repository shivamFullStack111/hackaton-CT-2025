// 🔹 CREATE MEETING
const createMeeting = async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.DYTE_BASE_URL}/meetings`,
      {
        title: req?.meetingTitle,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.ORG_ID}:${process.env.API_KEY}`).toString(
            "base64"
          )}`,
        },
      }
    );

    res.json(response.data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMeeting,
};

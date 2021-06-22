// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from "../../utils/mongodb";

import Register from "../../models/Register";

connectDB();
export default async function reg(req, res) {
  if (req.method === "POST") {
    try {
      const { student_id, token } = req.body.data;

      console.log("body", req);

      let user = await Register.find({ student_id: student_id, token: token });

      //   res.json(user);

      return res.status(200).send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100MB",
    },
  },
};

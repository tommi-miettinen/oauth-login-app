import { getAccessToken } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import trivoreAPI from "../../../api/trivoreAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);

  const response = await trivoreAPI.editUser(
    accessToken as string,
    req.query.userId as string,
    req.body as UserData
  );

  if (!response) return res.send(403);

  res.status(200).json(response);
}

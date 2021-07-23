import { NextApiResponse, NextApiRequest } from "next";
import { isCoffee } from "../../utils/TypeGuardUtils";

const coffee = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const WRITE_API_KEY = process.env.WRITE_API_KEY;

  // クエリとAPIキーのチェック
  if (!isCoffee(req.body) || typeof WRITE_API_KEY === "undefined") {
    return res.status(404).end();
  }

  const coffee = await fetch(`https://pei-blog.microcms.io/api/v1/coffee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-WRITE-API-KEY": WRITE_API_KEY,
    },
    body: JSON.stringify(req.body),
  })
    .then(() => "Created")
    .catch(() => null);

  // CMS側で正しく作成されたかチェック
  if (coffee !== "Created") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ message: "OK" });

  res.end("Contact enabled");
};

export default coffee;

import axios from "axios";
import { NextApiHandler } from "next";

const TOKEN = process.env.BEARER_TOKEN;
const ENDPOINT = "https://api.twitter.com/2/tweets";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  if (!TOKEN) return res.status(500).json("No token found");

  const params = new URLSearchParams({
    "tweet.fields":
      "author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld",
    expansions:
      "author_id,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id",
    "user.fields":
      "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld",
    "place.fields":
      "contained_within,country,country_code,full_name,geo,id,name,place_type",
  });

  const response = await axios.get(`${ENDPOINT}/${id}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  res.status(200).json(response.data);
};

export default handler;

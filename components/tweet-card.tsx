import Image from "next/image";
import { TwitterLogo, VerifiedBadge } from "./twitter";
import { TweetData } from "../types";
import { FC } from "react";

interface TweetCardProps {
  tweetData: TweetData;
}

export const TweetCard: FC<TweetCardProps> = ({ tweetData }) => {
  return (
    <div
      className="bg-white rounded-lg p-6 text-black relative shadow-lg"
      id="htmlToImageVis"
    >
      <div className="absolute top-6 right-6">
        <TwitterLogo />
      </div>

      <div className="flex items-center">
        <Image
          alt="Profile Image"
          src={tweetData.includes.users[0].profile_image_url}
          width={56}
          height={56}
          className="rounded-full"
        />
        <div className="ml-4">
          <h1 className="font-semibold leading-tight inline-flex items-center gap-1">
            {tweetData.includes.users[0].name}
            <span>
              {tweetData.includes.users[0].verified && <VerifiedBadge />}
            </span>
          </h1>
          <h2 className="text-gray-400">
            @{tweetData.includes.users[0].username}
          </h2>
        </div>
      </div>
      <div className="mt-4">
        <p>{tweetData.data.text}</p>
      </div>
      <div className="mt-4">
        <p className="text-gray-400 text-sm">
          {new Date(tweetData.data.created_at).toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>
      </div>
    </div>
  );
};

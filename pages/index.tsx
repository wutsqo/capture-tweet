import Head from "next/head";
import { Inter } from "@next/font/google";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { TweetData } from "../types";
import { Button } from "../components/button";
import { TweetCard } from "../components/tweet-card";
import { toPng } from "html-to-image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [url, setUrl] = useState("");
  const [tweetData, setTweetData] = useState<TweetData | null>(null);

  const validateUrl = (url: string) => {
    const regex = new RegExp(
      "^(https?:\\/\\/)?((www\\.)?twitter\\.com\\/([a-zA-Z0-9_]+)\\/status\\/([0-9]+))"
    );
    return regex.test(url);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateUrl(url)) {
      const id = url.split("/").pop()?.slice(0, 19) ?? "";
      toast.promise(
        axios.get(`/api/tweet/${id}`).then((res) => {
          setTweetData(res.data);
          if (res.data.errors) throw new Error(res.data.errors[0].detail);
        }),
        {
          loading: "Loading",
          success: "Success",
          error: tweetData?.errors?.[0].detail ?? "Error",
        }
      );
    } else {
      toast.error("Invalid URL");
    }
  };

  const downloadImage = async () => {
    const element = document.getElementById("htmlToImageVis");
    if (!element) return;
    await toPng(element).then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = `tweet_${tweetData?.includes.users[0].username}_${tweetData?.data.id}.png`;
      link.href = dataUrl;
      link.click();
    });

    toast.success("Image downloaded");
  };

  return (
    <>
      <Head>
        <title>Capture Tweet</title>
        <meta
          name="description"
          content="Capture a tweet and download it as an image."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="w-screen min-h-screen flex items-center justify-center text-white p-4">
        <div className={`w-full max-w-xl ${inter.className}`}>
          <h1 className="text-4xl text-center font-semibold">
            📷 Capture Tweet
          </h1>
          <p className="text-center mt-2">
            Capture a tweet and download it as an image. <br /> Made with 🧡 by{" "}
            <a
              href="https://twitter.com/gitcommitsudoku"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              @gitcommitsudoku
            </a>
          </p>

          <form className="mt-12" onSubmit={onSubmit}>
            <div className="mt-12">
              <input
                className="w-full h-12 px-4 mt-4 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent"
                placeholder="Enter Tweet URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <Button type="submit" disabled={url === ""}>
                Capture
              </Button>
            </div>
          </form>

          <div className="w-full mt-12">
            {tweetData && !tweetData.errors && (
              <>
                <TweetCard tweetData={tweetData} />
                <div className="mt-6 flex justify-center">
                  <Button type="button" onClick={downloadImage}>
                    Download
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

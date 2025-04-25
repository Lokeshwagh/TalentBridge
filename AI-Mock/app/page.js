import React from "react";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Contect from "./_components/Contect";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const page = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Head>
        <title>AI Mock Interview</title>
        <meta
          name="description"
          content="Ace your next interview with AI-powered mock interviews"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-0">
        <h1 className="text-5xl md:text-6xl font-bold text-sky-400">
          AI Mock Interview
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
          Practice with AI-powered mock interviews and get personalized
          feedback.
        </p>
        <div className="mt-8">
          <a href="/dashboard">
            <Button className="px-8 py-3 text-lg font-semibold bg-violet-500 text-white rounded-lg shadow-lg hover:bg-violet-600">
              Start Interview
            </Button>
          </a>
        </div>
      </main>

      <footer className="py-8 bg-gray-900 text-center">
        <p className="text-gray-400">
          © 2025 AI Mock Interview. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default page;

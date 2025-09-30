import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const videos = [
  "/videos/s1.mp4",
  "/videos/s2.mp4",
  "/videos/s4.mp4",
  "/videos/s3.mp4",
  "/videos/s5.mp4",
];

function Reelspage() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Delay showing videos for 1s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return; // Don't run observer while loading

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.7,
    });

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-5 left-5 z-10 bg-black/60 text-white rounded-full w-10 h-10 text-xl cursor-pointer"
        aria-label="Back to Home"
      >
        ←
      </button>

      {videos.map((src, idx) => (
        <div
          key={idx}
          className="h-screen w-screen flex items-center justify-center snap-start"
        >
          <video
            ref={(el) => (videoRefs.current[idx] = el)}
            src={src}
            controls
            loop
            className="max-h-full max-w-full bg-black"
          />
        </div>
      ))}
    </div>
  );
}

export default Reelspage;

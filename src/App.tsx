import React, { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas context not found!");
      return;
    }

    const numStars = 15000; // Extremely dense starfield
    const stars = [];
    let speedFactor = 5; // Initial speed factor (fast start)

    // Initialize stars with random positions and speed
    function createStars() {
      stars.length = 0; // Clear existing stars
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width, // Random horizontal position
          y: Math.random() * canvas.height, // Random vertical position
          z: Math.random() * canvas.width, // Depth for 3D effect
          originalSpeed: Math.random() * 1 + 0.5, // Base speed of movement
        });
      }
    }

    // Resize canvas and recreate stars
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    }

    // Draw and animate stars
    function drawStars() {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      ); // Clear canvas

      for (const star of stars) {
        // Move stars along the z-axis (depth) for 3D effect
        star.z -=
          star.originalSpeed * speedFactor; // Speed is multiplied by the current speedFactor
        if (star.z <= 0) {
          // Reset stars when they move past the viewer
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.z = canvas.width;
        }

        // Calculate star size and position based on depth
        const size =
          (1 - star.z / canvas.width) * 0.6; // Very tiny stars
        const x =
          (star.x - canvas.width / 2) *
            (canvas.width / star.z) +
          canvas.width / 2;
        const y =
          (star.y - canvas.height / 2) *
            (canvas.width / star.z) +
          canvas.height / 2;

        // Draw the star with brighter color
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle =
          "rgba(173, 216, 255, 0.9)"; // Very light blue color
        ctx.fill();
      }

      // Gradually decrease the speed factor to slow down the stars
      if (speedFactor > 0.1) {
        speedFactor -= 0.01; // Decrease speed factor gradually
      }

      requestAnimationFrame(drawStars); // Continue animation
    }

    // Initialize canvas and start animation
    resizeCanvas();
    drawStars();

    // Handle window resizing
    window.addEventListener(
      "resize",
      resizeCanvas
    );

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener(
        "resize",
        resizeCanvas
      );
    };
  }, []);

  return (
    <div className="h-screen w-full bg-[#14161D] relative">
      {/* Canvas for stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      ></canvas>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">
          Your Main Content
        </h1>
      </div>
    </div>
  );
}

export default App;

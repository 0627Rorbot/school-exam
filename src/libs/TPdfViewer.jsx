import React, { useEffect, useState, useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const TPdfViewer = () => {
  const viewerRef = useRef(null);

  return (
    <div
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
				<Viewer
					fileUrl='./slides.pdf'
				/>
      </Worker>
    </div>
  );
};

export default TPdfViewer;

import React, { useState, useEffect } from "react";
import "./LoadingScreen.css"; // Import external CSS
import logo from "../../../public/images/load.gif";

const LoadingScreen = ({ projectId, apiEndpoint, onPollingComplete }) => {
  const [isPolling, setIsPolling] = useState(true); // State to track polling
  const [projectJob, setProjectJob] = useState(""); 
  const [currentJobId, setCurrentJobId] = useState(0);
  const [visualStyle, setVisualStyle] = useState(null); // To store visual_style (AI Avatar, AI Images, or AI Video)
  const [projectStatus, setProjectStatus] = useState([]); // To store project_status (Audio, Video, Video Generate)
  const [actualStatus, setActualStatus] = useState(0); // Store actual status (e.g., the current job number in queue)
  
  useEffect(() => {
    // Poll the API every 10 seconds
     const fetchData = async () => {
        if (isPolling) {
          try {
            const response = await fetch(apiEndpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ project_id: projectId }),
            });
            const data = await response.json();

            if (data.status === 200) {
              const project_jobId = parseInt(data.result.project_queue); // Current project job ID (Total jobs)
              const current_JobID = parseInt(data.result.current_queue); // Currently processing job ID
              const actual_status = parseInt(data.result.actual_queue); // Actual Queue

              const project_status = data.result.project_status; // Array of statuses
              const visual_style = data.result.visual_style; // Array containing AI Avatar, AI Images, or AI Video

              //setProjectJob(project_jobId);
              setCurrentJobId(current_JobID);
              setVisualStyle(visual_style[0]); // Access the first value of the array (AI Avatar, AI Images, or AI Video)
              setProjectStatus(project_status);
              setActualStatus(actual_status);

              let currentQueue = 0;
              if (current_JobID <= project_jobId) {
                currentQueue = project_jobId - current_JobID;
              }

              console.log("project JOB ID", project_jobId);
              console.log("Current JOB ID", current_JobID);

              if(project_jobId == current_JobID){
                setProjectJob("Job in Progress");
              } else if(project_jobId < current_JobID){
                setProjectJob(`You Job ID is failed`);
              } else {
                  setProjectJob(`Current you are in Queue: ${actual_status}`);
              }

              setCurrentJobId(currentQueue);

              // Check if "Video Generate" is in the project_status array and stop polling if needed
              if (project_status.includes("Video Generate")) {
                setIsPolling(false); // Stop polling
                clearInterval(interval); // Clear the interval
                const status = "video_generate";
                if (onPollingComplete) {
                  setTimeout(() => {
                      onPollingComplete(status); // Call the callback
                  }, 2000);
                }
              } else if (project_status.includes("failed")) {
                
                setIsPolling(false); // Stop polling
                clearInterval(interval); // Clear the interval
                const status = "failed";
                if (onPollingComplete) {
                  setTimeout(() => {
                      onPollingComplete(status); // Call the callback
                  }, 2000);
                }
              }
            }
          } catch (error) {
            console.error("Error fetching status:", error);
          }
        }
      }


      //fetchData();

      const interval = setInterval(() => {
        if (isPolling) {
          fetchData();
        }
      }, 9000);
    

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [isPolling, apiEndpoint, projectId, onPollingComplete]);

  // Calculate the current queue status in the format "X/Y"
  const getQueueStatus = () => {
      return projectJob;
  };

  const renderCheckboxes = () => {
    const checkboxes = [];
    
    // Based on visual_style, render the appropriate checkboxes
    if (visualStyle === "AI Avatar") {
      if (isPolling) {
        checkboxes.push(<h5 className="loading_heading_title5">{getQueueStatus()}</h5>);
        checkboxes.push(<p></p>);
      }
      checkboxes.push(
        <div key="audio" className="checkbox-container">
          <input
            type="checkbox"
            checked={projectStatus.includes("Audio")}
            readOnly
            className="checkbox"
            id="audio-checkbox"
          />
          <label htmlFor="audio-checkbox" className="checkbox-label">
            Audio
          </label>
        </div>,
        <div key="DataProcessing" className="checkbox-container">
        <input
          type="checkbox"
          checked={projectStatus.includes("Data Processing")}
          readOnly
          className="checkbox"
          id="video-checkbox"
        />
        <label htmlFor="video-checkbox" className="checkbox-label">
          Data Processing
        </label>
        </div>,
        <div key="video" className="checkbox-container">
          <input
            type="checkbox"
            checked={projectStatus.includes("Video")}
            readOnly
            className="checkbox"
            id="video-checkbox"
          />
          <label htmlFor="video-checkbox" className="checkbox-label">
            Video
          </label>
        </div>,
        <div key="JSONGeneration" className="checkbox-container">
        <input
          type="checkbox"
          checked={projectStatus.includes("JSON Generation")}
          readOnly
          className="checkbox"
          id="video-checkbox"
        />
        <label htmlFor="video-checkbox" className="checkbox-label">
            JSON Generation
        </label>
        </div>,
        <div key="videoGenerate" className="checkbox-container">
          <input
            type="checkbox"
            checked={projectStatus.includes("Video Generate")}
            readOnly
            className="checkbox"
            id="video-generate-checkbox"
          />
          <label htmlFor="video-generate-checkbox" className="checkbox-label">
            Video Generated
          </label>
        </div>
      );
    } else if (visualStyle === "AI Images") {
      if (isPolling) {
        checkboxes.push(<h5 className="loading_heading_title5">{getQueueStatus()}</h5>);
        checkboxes.push(<p></p>);
      }
      checkboxes.push(
        <div key="ImageCreation" className="checkbox-container">
          <input
            type="checkbox"
            checked={projectStatus.includes("Image Creation")}
            readOnly
            className="checkbox"
            id="video-checkbox"
          />
          <label htmlFor="video-checkbox" className="checkbox-label">
            Image Creation
          </label>
        </div>,

        <div key="DataProcessing" className="checkbox-container">
        <input
          type="checkbox"
          checked={projectStatus.includes("Data Processing")}
          readOnly
          className="checkbox"
          id="video-checkbox"
        />
        <label htmlFor="video-checkbox" className="checkbox-label">
          Data Processing
        </label>
        </div>,

        <div key="JSONGeneration" className="checkbox-container">
        <input
          type="checkbox"
          checked={projectStatus.includes("JSON Generation")}
          readOnly
          className="checkbox"
          id="video-checkbox"
        />
        <label htmlFor="video-checkbox" className="checkbox-label">
            JSON Generation
        </label>
        </div>,

        <div key="videoGenerate" className="checkbox-container">
          <input
            type="checkbox"
            checked={projectStatus.includes("Video Generate")}
            readOnly
            className="checkbox"
            id="video-generate-checkbox"
          />
          <label htmlFor="video-generate-checkbox" className="checkbox-label">
            Video Generated
          </label>
        </div>
      );
    } else if (visualStyle === "AI Video") {
      if (isPolling) {
        checkboxes.push(<h5 className="loading_heading_title5">{getQueueStatus()}</h5>);
        checkboxes.push(<p></p>);
      }
      checkboxes.push(
        <div key="video" className="checkbox-container">
          <input
            type="checkbox"
            checked={projectStatus.includes("Video")}
            readOnly
            className="checkbox"
            id="video-checkbox"
          />
          <label htmlFor="video-checkbox" className="checkbox-label">
            Video
          </label>
        </div>,

        <div key="DataProcessing" className="checkbox-container">
        <input
          type="checkbox"
          checked={projectStatus.includes("Data Processing")}
          readOnly
          className="checkbox"
          id="video-checkbox"
        />
        <label htmlFor="video-checkbox" className="checkbox-label">
          Data Processing
        </label>
        </div>,


      <div key="JSONGeneration" className="checkbox-container">
      <input
        type="checkbox"
        checked={projectStatus.includes("JSON Generation")}
        readOnly
        className="checkbox"
        id="video-checkbox"
      />
      <label htmlFor="video-checkbox" className="checkbox-label">
          JSON Generation
      </label>
      </div>,

        <div key="videoGenerate" className="checkbox-container">
          <input
            type="checkbox"
            checked={projectStatus.includes("Video Generate")}
            readOnly
            className="checkbox"
            id="video-generate-checkbox"
          />
          <label htmlFor="video-generate-checkbox" className="checkbox-label">
            Video Generated
          </label>
        </div>
      );
    }

    return checkboxes;
  };

  return (
    <div className="loading-screen">
      <div className="loading-content loading_animation">
        <img src={logo} alt="Loading..." style={{ marginBottom: "20px" }} />
        <h2 className="loading_heading_title2">Sit back and relax while we generate your video.</h2>
        <h4 className="loading_heading_title4">You can monitor the progress, or close the window and wait for the completion email to arrive in your inbox.</h4>
        {renderCheckboxes()}
      </div>
    </div>
  );
};

export default LoadingScreen;

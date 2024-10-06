declare module "webgazer" {
  export interface GazeData {
    x: number; // X coordinate of gaze
    y: number; // Y coordinate of gaze
    eyeFeatures: any; // Additional eye tracking data, you can specify more detailed types if needed
    state: any; // State of the tracking
  }

  export interface WebGazer {
    setGazeListener(
      callback: (data: GazeData, timestamp: number) => void
    ): WebGazer;
    begin(): void;
    end(): void;
    pause(): void;
    resume(): void;
    getCurrentPrediction(): GazeData | null;
  }

  const webgazer: WebGazer;
  export default webgazer;
}

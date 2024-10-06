import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "@mediapipe/camera_utils";
import {
  FaceMesh,
  Results,
  NormalizedLandmarkList,
} from "@mediapipe/face_mesh";
import "./index.scss";

type Point = {
  x: number;
  y: number;
};

export const Home = () => {
  const webcamRef = useRef<Webcam>(null);
  const resultsRef = useRef<Results>();

  const [rightEye, setRightEye] = useState<Point>({ x: 0, y: 0 });
  const [leftEye, setLeftEye] = useState<Point>({ x: 0, y: 0 });

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  /** 目の中心を計算するヘルパー関数 */
  const calculateEyeCenter = (
    landmarks: NormalizedLandmarkList,
    eyeIndices: number[]
  ) => {
    let xSum = 0;
    let ySum = 0;

    eyeIndices.forEach((index) => {
      xSum += landmarks[index].x;
      ySum += landmarks[index].y;
    });

    const xAvg = xSum / eyeIndices.length;
    const yAvg = ySum / eyeIndices.length;

    return { x: xAvg, y: yAvg };
  };

  /** 瞳の座標と目の中心から視点を計算してログに出力 */
  const logEyeTracking = (results: Results) => {
    if (results.multiFaceLandmarks && results.multiFaceLandmarks[0]) {
      const landmarks = results.multiFaceLandmarks[0];

      // 瞳のランドマーク
      const rightIris = landmarks[468]; // 右目の瞳
      const leftIris = landmarks[473]; // 左目の瞳

      // 目の周りのランドマーク（右目と左目）
      const rightEyeIndices = [33, 133, 159, 145, 160, 144]; // FACEMESH_RIGHT_EYEから選定
      const leftEyeIndices = [362, 263, 387, 373, 388, 374]; // FACEMESH_LEFT_EYEから選定

      // 目の中心点を計算
      const rightEyeCenter = calculateEyeCenter(landmarks, rightEyeIndices);
      const leftEyeCenter = calculateEyeCenter(landmarks, leftEyeIndices);

      // 瞳と目の中心点の差を計算（差が視点の方向を示す）
      const rightEyeDx = rightIris.x - rightEyeCenter.x;
      const rightEyeDy = rightIris.y - rightEyeCenter.y;
      const leftEyeDx = leftIris.x - leftEyeCenter.x;
      const leftEyeDy = leftIris.y - leftEyeCenter.y;

      // // 右目と左目の視点方向をログ出力
      // console.log(
      //   `Right Eye Direction: dx: ${rightEyeDx.toFixed(
      //     3
      //   )}, dy: ${rightEyeDy.toFixed(3)}`
      // );
      // console.log(
      //   `Left Eye Direction: dx: ${leftEyeDx.toFixed(
      //     3
      //   )}, dy: ${leftEyeDy.toFixed(3)}`
      // );

      setRightEye({ x: rightEyeDx, y: rightEyeDy });
      setLeftEye({ x: leftEyeDx, y: leftEyeDy });
    }
  };

  /** 検出結果（フレーム毎に呼び出される） */
  const onResults = useCallback((results: Results) => {
    // 検出結果の格納
    resultsRef.current = results;
    logEyeTracking(results); // 瞳と目の中心から視点の方向をログに出力
  }, []);

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true, // 瞳のランドマークを含む
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current!.video! });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    }

    return () => {
      faceMesh.close();
    };
  }, [onResults]);

  // キャリブレーション
  const [adjustX, setAdjustX] = useState(0);
  const [adjustY, setAdjustY] = useState(0);
  const handleCalibration = () => {
    setAdjustY(-1 * (rightEye.y + leftEye.y));
    setAdjustX(-1 * (rightEye.x + leftEye.x));
  };

  const [point1, setPoint1] = useState<Point>({ x: 0, y: 0 });
  const [point2, setPoint2] = useState<Point>({ x: 0, y: 0 });
  const [point3, setPoint3] = useState<Point>({ x: 0, y: 0 });
  const [point4, setPoint4] = useState<Point>({ x: 0, y: 0 });
  const [point5, setPoint5] = useState<Point>({ x: 0, y: 0 });
  const [point6, setPoint6] = useState<Point>({ x: 0, y: 0 });
  const [point7, setPoint7] = useState<Point>({ x: 0, y: 0 });
  const [point8, setPoint8] = useState<Point>({ x: 0, y: 0 });
  const [point9, setPoint9] = useState<Point>({ x: 0, y: 0 });

  return (
    <div>
      <Webcam
        ref={webcamRef}
        style={{ visibility: "hidden" }} // Webカメラの映像は非表示
        audio={false}
        width={1280}
        height={720}
        videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
      />
      <div
        style={{
          position: "absolute",
          top: `${
            screenHeight / 2 - 25 + (rightEye.y + leftEye.y + adjustY) * 150000
          }px`,
          left: `${
            screenWidth / 2 - 25 - (rightEye.x + leftEye.x + adjustX) * 120000
          }px`,
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          borderRadius: "50%",
          pointerEvents: "none",
          transition: ".1s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${screenHeight / 2 - 25 + rightEye.y * 60000}px`,
          left: `${screenWidth / 2 - 25 - rightEye.x * 100000}px`,
          width: "50px",
          height: "50px",
          backgroundColor: "pink",
          borderRadius: "50%",
          pointerEvents: "none",
          transition: ".1s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${screenHeight / 2 - 25 + leftEye.y * 60000}px`,
          left: `${screenWidth / 2 - 25 - leftEye.x * 100000}px`,
          width: "50px",
          height: "50px",
          backgroundColor: "skyblue",
          borderRadius: "50%",
          pointerEvents: "none",
          transition: ".1s",
        }}
      />
      {/* キャリブレーション */}
      <div className={"calibration"}>
        <div className={"button"} onClick={handleCalibration}>
          calibration!
        </div>
        <div
          className={"point"}
          style={{
            top: `${10}px`,
            left: `${10}px`,
          }}
          onClick={() => {
            setPoint1({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
        <div
          className={"point"}
          style={{
            top: `${10}px`,
            left: `${screenWidth / 2 - 25}px`,
          }}
          onClick={() => {
            setPoint2({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
        <div
          className={"point"}
          style={{
            top: `${10}px`,
            right: `${10}px`,
          }}
          onClick={() => {
            setPoint3({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
        <div
          className={"point"}
          style={{
            top: `${screenHeight / 2 - 25}px`,
            left: `${10}px`,
          }}
          onClick={() => {
            setPoint4({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
        <div
          className={"point"}
          style={{
            top: `${screenHeight / 2 - 25}px`,
            left: `${screenWidth / 2 - 25}px`,
          }}
          onClick={() => {
            handleCalibration();
            setPoint5({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
        <div
          className={"point"}
          style={{
            top: `${screenHeight / 2 - 25}px`,
            right: `${10}px`,
          }}
          onClick={() => {
            setPoint6({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
        <div
          className={"point"}
          style={{
            bottom: `${10}px`,
            left: `${10}px`,
          }}
          onClick={() => {
            setPoint7({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
        <div
          className={"point"}
          style={{
            bottom: `${10}px`,
            left: `${screenWidth / 2 - 25}px`,
          }}
          onClick={() => {
            setPoint8({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
        <div
          className={"point"}
          style={{
            bottom: `${10}px`,
            right: `${10}px`,
          }}
          onClick={() => {
            setPoint9({ x: rightEye.x + leftEye.x, y: rightEye.y + leftEye.y });
          }}
        />
      </div>
    </div>
  );
};

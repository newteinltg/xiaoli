"use client";

import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const SharinganSketch = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [eyeIndex, setEyeIndex] = useState(0);

  const totalEyes = 10;

  useEffect(() => {
    let myP5: p5;

    const sketch = (p: p5) => {
      let angle = 0;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.mousePressed(changeEye);
        p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        p.background(0);
        p.translate(p.width / 2, p.height / 2);

        // 旋转动画
        angle += 1;
        p.rotate(angle);

        drawEye(eyeIndex);
      };

      const changeEye = () => {
        setEyeIndex((prev) => (prev + 1) % totalEyes);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      const drawEye = (index: number) => {
        // 基础巩膜
        p.noStroke();
        p.fill(200, 0, 0); // 写轮眼红
        p.ellipse(0, 0, 300, 300);
        
        // 瞳孔外圈
        p.stroke(0);
        p.strokeWeight(3);
        p.noFill();
        p.ellipse(0, 0, 200, 200);

        // 瞳孔中心
        p.fill(0);
        p.noStroke();
        p.ellipse(0, 0, 50, 50);

        // 不同类型的勾玉或万花筒图案
        p.fill(0);
        switch (index) {
          case 0: // 单勾玉
            drawTomoe(0, -100, 30);
            break;
          case 1: // 双勾玉
            drawTomoe(0, -100, 30);
            drawTomoe(0, 100, 30);
            break;
          case 2: // 三勾玉
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotate(i * 120);
              drawTomoe(0, -100, 30);
              p.pop();
            }
            break;
          case 3: // 万花筒 - 鼬 (三刃镖形)
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotate(i * 120);
              p.beginShape();
              p.vertex(0, -25);
              p.bezierVertex(-80, -80, -40, -140, 0, -140);
              p.bezierVertex(40, -140, 80, -80, 0, -25);
              p.endShape(p.CLOSE);
              p.pop();
            }
            break;
          case 4: // 万花筒 - 佐助 (六芒星)
            p.stroke(0);
            p.strokeWeight(10);
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotate(i * 60);
              p.ellipse(0, 0, 280, 60);
              p.pop();
            }
            break;
          case 5: // 万花筒 - 卡卡西/带土 (神威 - 三个大镰刀)
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotate(i * 120);
              p.beginShape();
              p.vertex(0, -25);
              p.bezierVertex(-120, -30, -120, -150, 0, -150);
              p.bezierVertex(-80, -150, -40, -50, 0, -25);
              p.endShape(p.CLOSE);
              p.pop();
            }
            break;
          case 6: // 万花筒 - 止水 (四角大风车)
            for (let i = 0; i < 4; i++) {
              p.push();
              p.rotate(i * 90);
              p.beginShape();
              p.vertex(0, -25);
              p.bezierVertex(-100, -20, -100, -130, 0, -130);
              p.bezierVertex(-60, -130, -30, -50, 0, -25);
              p.endShape(p.CLOSE);
              p.pop();
            }
            break;
          case 7: // 万花筒 - 斑 (三个相连的圆弧)
            p.noFill();
            p.stroke(0);
            p.strokeWeight(15);
            p.ellipse(0, 0, 180, 180);
            for (let i = 0; i < 3; i++) {
                p.push();
                p.rotate(i * 120);
                p.fill(0);
                p.ellipse(0, -90, 40, 40);
                p.pop();
            }
            break;
          case 8: // 永恒万花筒 - 佐助 (融合图案)
            p.stroke(0);
            p.strokeWeight(5);
            for (let i = 0; i < 3; i++) {
                p.push();
                p.rotate(i * 120);
                p.fill(0);
                p.ellipse(0, -80, 120, 240);
                p.pop();
            }
            p.fill(0);
            p.ellipse(0,0, 100, 100);
            break;
          case 9: // 轮回眼 (虽然不是写轮眼，但作为进阶)
            p.fill(180, 160, 200); // 紫色巩膜
            p.ellipse(0, 0, 300, 300);
            p.noFill();
            p.stroke(0);
            p.strokeWeight(3);
            for(let i = 1; i <= 6; i++) {
                p.ellipse(0, 0, i * 50, i * 50);
            }
            p.fill(0);
            p.ellipse(0,0, 20, 20);
            break;
        }
      };

      const drawTomoe = (x: number, y: number, r: number) => {
        p.push();
        p.translate(x, y);
        p.rotate(-angle); // 使勾玉本身不随眼球整体旋转
        p.fill(0);
        p.ellipse(0, 0, r, r);
        p.beginShape();
        p.vertex(r / 2, 0);
        p.bezierVertex(r / 2, -r, -r, -r, -r, 0);
        p.endShape(p.CLOSE);
        p.pop();
      };
    };

    if (canvasRef.current) {
      myP5 = new p5(sketch, canvasRef.current);
    }

    return () => {
      myP5.remove();
    };
  }, [eyeIndex]);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden touch-none">
      <div ref={canvasRef} className="cursor-pointer" />
      <div className="absolute bottom-10 text-white font-mono text-lg opacity-50 pointer-events-none">
        TAP TO EVOLVE | 当前等级: {eyeIndex + 1}/10
      </div>
    </div>
  );
};

export default SharinganSketch;

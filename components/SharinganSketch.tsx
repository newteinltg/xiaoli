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
      let baseSize = 0;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.mousePressed(changeEye);
        // 处理移动端触摸
        canvas.touchEnded(changeEye);
        p.angleMode(p.DEGREES);
        calculateSize();
      };

      const calculateSize = () => {
        // 根据屏幕宽度计算基准大小，确保在手机上也能完整显示
        baseSize = p.min(p.width, p.height) * 0.8;
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
        return false; // 防止默认行为
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        calculateSize();
      };

      const drawEye = (index: number) => {
        const rMain = baseSize;
        const rInner = baseSize * 0.66;
        const rPupil = baseSize * 0.16;
        const rTomoe = baseSize * 0.1;
        const tomoeDist = baseSize * 0.33;

        // 基础巩膜
        p.noStroke();
        p.fill(220, 0, 0); // 写轮眼红
        p.ellipse(0, 0, rMain, rMain);
        
        // 瞳孔外圈
        p.stroke(0);
        p.strokeWeight(p.max(1, baseSize * 0.01));
        p.noFill();
        p.ellipse(0, 0, rInner, rInner);

        // 瞳孔中心
        p.fill(0);
        p.noStroke();
        p.ellipse(0, 0, rPupil, rPupil);

        // 不同类型的勾玉或万花筒图案
        p.fill(0);
        p.stroke(0);
        
        switch (index) {
          case 0: // 单勾玉
            drawTomoe(0, -tomoeDist, rTomoe);
            break;
          case 1: // 双勾玉
            drawTomoe(0, -tomoeDist, rTomoe);
            drawTomoe(0, tomoeDist, rTomoe);
            break;
          case 2: // 三勾玉
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotate(i * 120);
              drawTomoe(0, -tomoeDist, rTomoe);
              p.pop();
            }
            break;
          case 3: // 万花筒 - 鼬 (三刃镖形)
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotate(i * 120);
              p.beginShape();
              p.vertex(0, -rPupil * 0.5);
              p.bezierVertex(-baseSize * 0.25, -baseSize * 0.25, -baseSize * 0.15, -baseSize * 0.45, 0, -baseSize * 0.45);
              p.bezierVertex(baseSize * 0.15, -baseSize * 0.45, baseSize * 0.25, -baseSize * 0.25, 0, -rPupil * 0.5);
              p.endShape(p.CLOSE);
              p.pop();
            }
            break;
          case 4: // 万花筒 - 佐助 (六芒星)
            p.strokeWeight(baseSize * 0.03);
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotate(i * 60);
              p.ellipse(0, 0, baseSize * 0.9, baseSize * 0.2);
              p.pop();
            }
            break;
          case 5: // 万花筒 - 卡卡西/带土 (神威)
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotate(i * 120);
              p.beginShape();
              p.vertex(0, -rPupil * 0.5);
              p.bezierVertex(-baseSize * 0.4, -baseSize * 0.1, -baseSize * 0.4, -baseSize * 0.5, 0, -baseSize * 0.5);
              p.bezierVertex(-baseSize * 0.25, -baseSize * 0.5, -baseSize * 0.15, -baseSize * 0.15, 0, -rPupil * 0.5);
              p.endShape(p.CLOSE);
              p.pop();
            }
            break;
          case 6: // 万花筒 - 止水 (四角大风车)
            for (let i = 0; i < 4; i++) {
              p.push();
              p.rotate(i * 90);
              p.beginShape();
              p.vertex(0, -rPupil * 0.5);
              p.bezierVertex(-baseSize * 0.35, -baseSize * 0.05, -baseSize * 0.35, -baseSize * 0.4, 0, -baseSize * 0.4);
              p.bezierVertex(-baseSize * 0.2, -baseSize * 0.4, -baseSize * 0.1, -baseSize * 0.15, 0, -rPupil * 0.5);
              p.endShape(p.CLOSE);
              p.pop();
            }
            break;
          case 7: // 万花筒 - 斑 (三个相连的圆弧)
            p.noFill();
            p.strokeWeight(baseSize * 0.05);
            p.ellipse(0, 0, baseSize * 0.6, baseSize * 0.6);
            for (let i = 0; i < 3; i++) {
                p.push();
                p.rotate(i * 120);
                p.fill(0);
                p.noStroke();
                p.ellipse(0, -baseSize * 0.3, rTomoe * 1.5, rTomoe * 1.5);
                p.pop();
            }
            break;
          case 8: // 永恒万花筒 - 佐助
            p.strokeWeight(baseSize * 0.02);
            for (let i = 0; i < 3; i++) {
                p.push();
                p.rotate(i * 120);
                p.fill(0);
                p.ellipse(0, -baseSize * 0.25, baseSize * 0.4, baseSize * 0.8);
                p.pop();
            }
            p.fill(0);
            p.ellipse(0,0, baseSize * 0.3, baseSize * 0.3);
            break;
          case 9: // 轮回眼
            p.fill(160, 140, 180); // 紫色
            p.ellipse(0, 0, rMain, rMain);
            p.noFill();
            p.stroke(0);
            p.strokeWeight(p.max(1, baseSize * 0.005));
            for(let i = 1; i <= 6; i++) {
                p.ellipse(0, 0, (rMain / 6) * i, (rMain / 6) * i);
            }
            p.fill(0);
            p.ellipse(0,0, rPupil * 0.4, rPupil * 0.4);
            break;
        }
      };

      const drawTomoe = (x: number, y: number, r: number) => {
        p.push();
        p.translate(x, y);
        p.rotate(-angle); 
        p.fill(0);
        p.noStroke();
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
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden touch-none">
      <div ref={canvasRef} className="w-full h-full flex items-center justify-center cursor-pointer" />
      <div className="absolute bottom-6 left-0 right-0 text-center text-white font-mono text-sm sm:text-lg opacity-40 pointer-events-none select-none">
        TAP TO EVOLVE | STAGE {eyeIndex + 1}/10
      </div>
    </div>
  );
};

export default SharinganSketch;

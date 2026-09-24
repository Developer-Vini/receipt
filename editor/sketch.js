import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080,
  seed: 67,
};

export function drawReceipt(p) {
  const { width: w, height: h } = p;

  p.background(255);

  const cx = w / 2;
  const cy = h / 2;

  function polar(angle, radius) {
    return {
      x: p.cos(angle) * radius,
      y: p.sin(angle) * radius,
    };
  }

  function mathematicalFlower(radius, petals, amplitude, rotation = 0) {
    p.beginShape();

    const steps = 700;

    for (let i = 0; i <= steps; i++) {

      const angle = p.map(i, 0, steps, 0, p.TWO_PI);

      const wave1 = p.sin(petals * angle + rotation);
      const wave2 = p.sin((petals * 2) * angle) * 0.15;

      const r = radius * (1 + amplitude * wave1 + amplitude * wave2);
      const point = polar(angle, r);

      p.vertex(point.x, point.y);
    }

    p.endShape();
  }

  function spiral(turns, radius, offset = 0) {
    p.beginShape();

    const steps = 500;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;

      const angle = offset + t * p.TWO_PI * turns;

      const r = radius * t;
      const x = p.cos(angle) * r;
      const y = p.sin(angle) * r;

      p.vertex(x, y);
    }
    p.endShape();
  }

  p.push();
  p.translate(cx, cy);

  p.noFill();
  p.stroke(0);

  p.strokeWeight(1.2);

  mathematicalFlower(w * 0.40, 18, 0.22);
  p.strokeWeight(0.8);

  mathematicalFlower(w * 0.34, 24, 0.18, p.PI / 24);
  p.strokeWeight(0.6);

  mathematicalFlower(w * 0.27, 36, 0.14,p.PI / 36);
  p.strokeWeight(1);

  mathematicalFlower(w * 0.19, 12, 0.20);
  p.strokeWeight(1);

  for (let i = 0; i < 8; i++) {
    p.push();
    p.rotate(i * p.PI / 8);
    p.ellipse(0, 0, w * 0.72, w * 0.17);
    p.pop();
  }
  p.strokeWeight(0.6);

  for (let i = 0; i < 16; i++) {
    p.push();
    p.rotate(i * p.TWO_PI / 16);
    p.ellipse(0, 0, w * 0.58, w * 0.075);
    p.pop();
  }

  p.strokeWeight(0.8);

  spiral(7, w * 0.37, 0);
  spiral(7, w * 0.37, p.PI);

  p.strokeWeight(0.7);

  const rings = [0.08, 0.12, 0.16, 0.21, 0.25, 0.30, 0.35, 0.40];

  for (const r of rings) {
    p.circle(0, 0, w * r);
  }

  p.strokeWeight(0.5);

  for (let i = 0; i < 72; i++) {
    const angle = i * p.PI / 72;

    const inner = w * 0.18;
    const outer = w * 0.40;

    const a = polar(angle, inner);
    const b = polar(angle, outer);

    p.line(a.x, a.y, b.x, b.y);
  }

  p.noStroke();
  p.fill(0);

  for (let i = 0; i < 144; i++) {
    const angle = i * p.TWO_PI / 144;
    const radius = w * (0.20 + (i % 5) * 0.045);
    const point = polar(angle, radius);
    const size = i % 7 === 0 ? 3.5 : 1.3;

    p.circle(point.x, point.y, size);
  }

  for (let i = 0; i < 90; i++) {
    const angle = p.random(p.TWO_PI);
    const radius = p.random(w * 0.28, w * 0.45);
    const point = polar(angle, radius);
    const size = p.random(0.6, 2.5);

    p.circle(point.x, point.y, size);
  }
  p.fill(0);
  p.circle(0, 0, 58);

  p.fill(255);
  p.circle(0, 0, 40);

  p.fill(0);
  p.circle(0, 0, 21);

  p.fill(255);
  p.circle(0, 0, 7);

  p.noFill();
  p.stroke(0);
  p.strokeWeight(1);

  p.circle(0, 0, 72);
  p.circle(0, 0, 88);
  p.strokeWeight(1);

  for (let i = 0; i < 36; i++) {
    const angle = i * p.PI / 36;
    const a = polar(angle, w * 0.105);
    const b = polar(angle, w * 0.125)

    p.line(a.x, a.y, b.x, b.y);
  }

  p.pop();

  p.stroke(0);
  p.strokeWeight(1);

  p.line(30, 38, w - 30, 38);
  p.line(30, h - 38, w - 30, h - 38);

  p.noStroke();
  p.fill(0);

  p.textAlign(p.CENTER, p.CENTER);

  p.textFont("monospace");
  p.textSize(11);

  p.text("MATHEMATICAL POWER", cx, 22);
  p.textSize(8);

  p.text("EU • SOU • O • ARTISTA • COS", cx, h - 22);

  p.noFill();
  p.stroke(0);
  p.strokeWeight(1);

  const corners = [
    [30, 38],
    [w - 30, 38],
    [30, h - 38],
    [w - 30, h - 38],
  ];

  for (const [x, y] of corners) {
    p.rectMode(p.CENTER);
    p.square(x, y, 8);
  }
  p.rectMode(p.CORNER);
}
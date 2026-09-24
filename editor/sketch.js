import JsBarcode from "jsbarcode";

export const receipt = {
  height: 1080,
  seed: 67,
};

export function drawReceipt(p){
  const { width: w, height: h} = p

  p.background(255);

  const cx = w /2
  const cy = h/2;
  function polar(angle, radius){
    return {
      x: p.cos(angle) * radius,
      y: p.sin(angle) * radius,
    };
  }

  function mathematicalFlowe(radius, petals, amplitude, rotation = 0){
    p.beginShape();

    const steps = 700;

    for(let i=0;i<=steps;i++){
      const angle = p.map(i, 0, steps, 0, p.PI);

      const wave1 = p.sin(petals * angle + rotation);
      const wave2 = p.sin((petals * 2) * angle) * 0.15;

      const r = radius * (1+ amplitude * wave1 + amplitude * wave2);
      
      const point = polar(angle, r);

      p.vertex(point.x, point.y);
    }

    p.endShape();
  }
}
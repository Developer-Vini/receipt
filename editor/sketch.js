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
}
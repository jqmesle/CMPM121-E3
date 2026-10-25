const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS("http://www.w3.org/2000/svg", "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A character with a forest green to midnight black face, curly hair, and a smile",
);

const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

const gradient = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "linearGradient",
);
gradient.setAttribute("id", "face-gradient");
gradient.setAttribute("x1", "0%");
gradient.setAttribute("y1", "0%");
gradient.setAttribute("x2", "100%");
gradient.setAttribute("y2", "100%");

const start = document.createElementNS("http://www.w3.org/2000/svg", "stop");
start.setAttribute("offset", "0%");
start.setAttribute("stop-color", "#228B22");

const end = document.createElementNS("http://www.w3.org/2000/svg", "stop");
end.setAttribute("offset", "100%");
end.setAttribute("stop-color", "#101820");

gradient.append(start, end);
defs.append(gradient);
face.append(defs);

const head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "url(#face-gradient)");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

const leftEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse",
);
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS("http://www.w3.org/2000/svg", "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS("http://www.w3.org/2000/svg", "path");

mouth.setAttribute("d", "M 75 130 Q 100 160 125 130");
mouth.setAttribute("fill", "none");
mouth.setAttribute("stroke", "#f3cf87");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");

face.append(mouth);

for (let i = 0; i < 7; i++) {
  const x = 45 + i * 18;

  const curl = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );

  curl.setAttribute(
    "d",
    `M ${x} 48 Q ${x - 12} 10 ${x + 5} 22 Q ${x + 20} 5 ${x + 15} 45`,
  );

  curl.setAttribute("fill", "none");
  curl.setAttribute("stroke", "#302c29");
  curl.setAttribute("stroke-width", "5");
  curl.setAttribute("stroke-linecap", "round");

  face.append(curl);
}

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});

export function loadStyles(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  document.head.appendChild(link);
}

export const techIconMap = {
  // =========================
  // FRONTEND
  // =========================
  react: "devicon-react-original colored",
  vuejs: "devicon-vuejs-plain colored",
  nextjs: "devicon-nextjs-plain",
  tailwindcss: "devicon-tailwindcss-plain colored",
  bootstrap: "devicon-bootstrap-plain colored",
  sass: "devicon-sass-plain colored",
  webpack: "devicon-webpack-plain colored",
  vite: "devicon-vite-plain colored",
  gsap: "devicon-javascript-plain colored",
  html: "devicon-html5-plain colored",
  html5: "devicon-html5-plain colored",
  css: "devicon-css3-plain colored",
  css3: "devicon-css3-plain colored",
  javascript: "devicon-javascript-plain colored",
  typescript: "devicon-typescript-plain colored",
  rabbitmq: "devicon-rabbitmq-original colored",
  powershell: "devicon-bash-plain colored",

  // =========================
  // BACKEND
  // =========================
  net: "devicon-dot-net-plain colored",
  nodejs: "devicon-nodejs-plain colored",
  express: "devicon-express-original",
  expressjs: "devicon-express-original",
  php: "devicon-php-plain colored",
  laravel: "devicon-laravel-plain colored",
  django: "devicon-django-plain colored",
  python: "devicon-python-plain colored",
  graphql: "devicon-graphql-plain colored",
  golang: "devicon-go-original-wordmark colored",

  // =========================
  // DATABASE
  // =========================
  mongodb: "devicon-mongodb-plain colored",
  mysql: "devicon-mysql-plain colored",
  postgresql: "devicon-postgresql-plain colored",
  sqlserver: "devicon-microsoftsqlserver-plain colored",
  sqlite: "devicon-sqlite-plain colored",
  firebase: "devicon-firebase-plain colored",

  // =========================
  // DEVOPS / CLOUD
  // =========================
  azure: "devicon-azure-plain colored",
  azuredevops: "devicon-azure-plain colored",
  docker: "devicon-docker-plain colored",
  git: "devicon-git-plain colored",
  cicd: "devicon-githubactions-plain colored",

  // =========================
  // AI / ML
  // =========================
  tensorflow: "devicon-tensorflow-original colored",
  pytorch: "devicon-pytorch-original colored",
  opencv: "devicon-opencv-plain colored",
  numpy: "devicon-numpy-plain colored",
  scikitlearn: "devicon-scikitlearn-plain colored",
  yolo: "devicon-python-plain colored",
  yolov8: "devicon-python-plain colored",
  roboflow: "devicon-numpy-plain colored",
  gradio: "devicon-google-plain colored",
  googlecolab: "devicon-google-plain colored",
  pandas: "devicon-pandas-plain colored",
  // =========================
  // MOBILE
  // =========================
  java: "devicon-java-plain colored",
  androidstudio: "devicon-androidstudio-plain colored",

  // =========================
  // TOOLS
  // =========================
  figma: "devicon-figma-plain colored",
  postman: "devicon-postman-plain colored",
  restapi: "devicon-fastapi-plain colored",
  d3: "devicon-d3js-plain colored",
  chartjs: "devicon-chartjs-plain colored",
  veracode: "devicon-devicon-plain",
  visio: "devicon-windows8-original colored",
  microsoftexcel: "devicon-windows8-original colored",
};

export const badgeColors = {
  design: {
    bg: "var(--badge-design-bg)",
    text: "var(--badge-design-text)",
    border: "var(--badge-design-border)",
  },

  webApp: {
    bg: "var(--badge-web-bg)",
    text: "var(--badge-web-text)",
    border: "var(--badge-web-border)",
  },

  web: {
    bg: "var(--badge-web-bg)",
    text: "var(--badge-web-text)",
    border: "var(--badge-web-border)",
  },

  research: {
    bg: "var(--badge-research-bg)",
    text: "var(--badge-research-text)",
    border: "var(--badge-research-border)",
  },

  mobileApp: {
    bg: "var(--badge-mobile-bg)",
    text: "var(--badge-mobile-text)",
    border: "var(--badge-mobile-border)",
  },

  systemDesign: {
    bg: "var(--badge-system-bg)",
    text: "var(--badge-system-text)",
    border: "var(--badge-system-border)",
  },

  certification: {
    bg: "var(--badge-certification-bg)",
    text: "var(--badge-certification-text)",
    border: "var(--badge-certification-border)",
  },

  dashboard: {
    bg: "var(--badge-dashboard-bg)",
    text: "var(--badge-dashboard-text)",
    border: "var(--badge-dashboard-border)",
  },

  default: {
    bg: "var(--badge-default-bg)",
    text: "var(--badge-default-text)",
    border: "var(--badge-default-border)",
  },
};

export function getBadgeStyle(category) {
  return badgeColors[category] || badgeColors.default;
}

export function normalizeTech(tech) {
  return tech.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getTechIcon(tech) {
  const key = normalizeTech(tech);

  console.log("Original:", tech);
  console.log("Normalized:", key);
  console.log("Icon:", techIconMap[key]);

  return techIconMap[key] || "devicon-devicon-plain";
}

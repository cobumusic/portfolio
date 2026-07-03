import {spawn} from "child_process";
import {chromium} from "playwright";

const PORT = 4534;
const URL = `http://localhost:${PORT}/resume-html`;
const OUTPUT_PATH = "./resume.pdf";

async function waitForServer(url, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return true;
      }
    } catch {
      //Server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Server failed to start after ${maxAttempts} seconds`);
}

async function main() {
  console.log("Starting dev server...");
  const devServer = spawn("npm", ["run", "dev", "--", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
    detached: true,
  });

  devServer.stdout.on("data", (data) => {
    const output = data.toString();
    if (output.includes("Ready")) {
      console.log("Dev server ready");
    }
  });

  devServer.stderr.on("data", (data) => {
    console.error(`Dev server error: ${data}`);
  });

  try {
    console.log(`Waiting for server at ${URL}...`);
    await waitForServer(URL);

    console.log("Launching browser...");
    const browser = await chromium.launch();
    const page = await browser.newPage();

    console.log(`Navigating to ${URL}...`);
    await page.goto(URL, {waitUntil: "networkidle"});

    //Scroll through page to trigger intersection observer animations
    await page.evaluate(async() => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 200;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });

    //Wait for animations to complete
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Generating PDF at ${OUTPUT_PATH}...`);
    await page.pdf({
      format: "Letter",
      path: OUTPUT_PATH,
      printBackground: true,
      tagged: true,
    });

    console.log("Done!");
    await browser.close();
  } finally {
    console.log("Shutting down dev server...");
    process.kill(-devServer.pid, "SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

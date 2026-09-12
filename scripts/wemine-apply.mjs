#!/usr/bin/env node

/**
 * WeMine Web Developer Trainee — Method 1 JSON application helper.
 *
 * Default: dry-run (print payload + URL checks, no POST).
 * Submit:  node scripts/wemine-apply.mjs --submit
 */

// Listing shows http://; nginx 301s to https and fetch would drop the POST body.
const ENDPOINT = "https://career.wemine.hk/cv-submit"
const SITE_BASE = "https://xiashuidaolaoshuren.github.io"
const REPO_RAW_BASE =
  "https://raw.githubusercontent.com/xiashuidaolaoshuren/xiashuidaolaoshuren.github.io/main"

const payload = {
  name: "SO Chun Ning, Felix",
  email: "so1490600850@gmail.com",
  position: "Web Developer Trainee",
  cv_url: `${SITE_BASE}/SoChunNing_resume_SWE.pdf`,
  cover_letter_url: `${SITE_BASE}/wemine-cover-letter.html`,
  intro:
    "Recent CUHK B.Eng. AI graduate based in Hong Kong. I build with React, TypeScript, HTML/CSS, and JavaScript, and have shipped web features in internship roles at iASPEC and Gekko. I am applying via Method 1 because it matches how I like to work: clear contracts, practical tooling, and shipping real products.",
  website: `${SITE_BASE}/`,
  note:
    "I am a Hong Kong permanent resident. Submitted via Method 1 JSON POST; portfolio and CV are hosted on GitHub Pages, and the submission script is linked at code_url.",
  code_url: `${REPO_RAW_BASE}/scripts/wemine-apply.mjs`,
}

const URL_FIELDS = [
  "cv_url",
  "cover_letter_url",
  "website",
  "code_url",
]

const args = new Set(process.argv.slice(2))
const shouldSubmit = args.has("--submit")
const skipUrlChecks = args.has("--skip-url-checks")

async function checkUrl(label, url) {
  let response
  try {
    response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
    })
  } catch (error) {
    throw new Error(`${label} unreachable (${url}): ${error.message}`)
  }

  if (response.status === 405 || response.status === 403) {
    response = await fetch(url, { method: "GET", redirect: "follow" })
  }

  if (!response.ok) {
    throw new Error(`${label} returned HTTP ${response.status} (${url})`)
  }

  console.log(`✓ ${label}: ${response.status} ${url}`)
}

async function verifyUrls() {
  console.log("Checking hosted URLs…")
  for (const field of URL_FIELDS) {
    await checkUrl(field, payload[field])
  }
}

async function submitApplication() {
  console.log(`\nPOST ${ENDPOINT}`)
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const text = await response.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = { raw: text }
  }

  console.log(`HTTP ${response.status}`)
  console.log(JSON.stringify(body, null, 2))

  const success =
    response.status === 200 &&
    body?.status === "success" &&
    body?.message === "APPLICATION_SUBMITTED"

  if (!success) {
    process.exitCode = 1
    console.error("\nSubmission did not succeed. Only HTTP 200 with APPLICATION_SUBMITTED counts.")
    return
  }

  console.log("\nApplication submitted successfully.")
}

async function main() {
  console.log("WeMine application payload:\n")
  console.log(JSON.stringify(payload, null, 2))

  if (!skipUrlChecks) {
    console.log("")
    try {
      await verifyUrls()
    } catch (error) {
      console.error(`\nURL check failed: ${error.message}`)
      if (!shouldSubmit) {
        console.error(
          "Dry-run stopped. Fix URLs or pass --skip-url-checks if you know they will work after deploy.",
        )
      }
      process.exitCode = 1
      if (!shouldSubmit) return
    }
  }

  if (!shouldSubmit) {
    console.log("\nDry-run complete. Re-run with --submit to POST the application.")
    return
  }

  await submitApplication()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

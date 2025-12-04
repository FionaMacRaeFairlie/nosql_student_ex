// controllers/studentSearchController.js (ESM)

import StudentDatabase from "../models/studentModel.js";
const db = new StudentDatabase("database/student.db");

// Optionally seed once at startup
// await db.init();

function restructureData(subject, list) {
  return list.map((item) => {
    const newEntry = { student: item.student };
    const match = Array.isArray(item.modules)
      ? item.modules.find((m) => m?.name === subject)
      : undefined;

    if (match) {
      newEntry.subject = match.name;
      newEntry.grade = match.grade;
    }
    return newEntry;
  });
}

export async function landing_page(req, res) {
  try {
    const list = await db.displayAll();
    res.render("studentex", { entries: list });
  } catch (err) {
    console.error("landing_page error:", err);
    res.status(500).send("Internal Server Error");
  }
}

export async function web_development(req, res) {
  const subject = "Web Development";
  try {
    const list = await db.displayWebDev();
    res.render("classList", { title: subject, entries: list });
  } catch (err) {
    console.error("web_development error:", err);
    res.status(500).send("Internal Server Error");
  }
}

export async function low_performance(req, res) {
  try {
    const list = await db.displayLowPerformance();
    res.render("performance", {
      title: "Students with poor performance",
      entries: list,
    });
  } catch (err) {
    console.error("low_performance error:", err);
    res.status(500).send("Internal Server Error");
  }
}

// DRY helper for pass/fail subject views
async function renderSubjectStatus(req, res, subject, status) {
  try {
    const list =
      status === "pass"
        ? await db.displayPass(subject)
        : await db.displayFail(subject);

    const subjectList = restructureData(subject, list);

    res.render("subjectPerformance", {
      title: subject,
      entries: subjectList,
      status,
    });
  } catch (err) {
    console.error(`renderSubjectStatus(${subject}, ${status}) error:`, err);
    res.status(500).send("Internal Server Error");
  }
}

// Fail routes
export function fail_programming(req, res) {
  return renderSubjectStatus(req, res, "Programming", "fail");
}
export function fail_se(req, res) {
  return renderSubjectStatus(req, res, "Software Engineering", "fail");
}
export function fail_webdev(req, res) {
  return renderSubjectStatus(req, res, "Web Development", "fail");
}
export function fail_aadp(req, res) {
  return renderSubjectStatus(req, res, "Application Architectures", "fail");
}

// Pass routes
export function pass_programming(req, res) {
  return renderSubjectStatus(req, res, "Programming", "pass");
}
export function pass_se(req, res) {
  return renderSubjectStatus(req, res, "Software Engineering", "pass");
}
export function pass_webdev(req, res) {
  return renderSubjectStatus(req, res, "Web Development", "pass");
}
export function pass_aadp(req, res) {
  return renderSubjectStatus(req, res, "Application Architectures", "pass");
}

// Class list page
export async function application_arch(req, res) {
  const subject = "Application Architectures";
  try {
    const list = await db.displayAppArch();
    res.render("classList", { title: subject, entries: list });
  } catch (err) {
    console.error("application_arch error:", err);
    res.status(500).send("Internal Server Error");
  }
}

// JSON endpoint
export async function serveJson(req, res) {
  try {
    const list = await db.displayAll();
    res.json(list);
  } catch (err) {
    console.error("serveJson error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Optional: default export namespace
export default {
  landing_page,
  web_development,
  low_performance,
  fail_programming,
  fail_se,
  fail_webdev,
  fail_aadp,
  pass_programming,
  pass_se,
  pass_webdev,
  pass_aadp,
  application_arch,
  serveJson,
};

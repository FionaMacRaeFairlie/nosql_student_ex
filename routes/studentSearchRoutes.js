// routes/studentSearchRoutes.js (ESM)

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Static files
const publicDir = path.join(__dirname, "../public");
router.use(express.static(publicDir));

// --- Controller import ---
// If your controller exports a default object (e.g., export default { ... }):
import controller from "../controllers/studentSearchController.js";

// If instead your controller uses *named* exports (e.g., export function landing_page...):
// import * as controller from '../controllers/studentSearchController.js';

// Routes
router.get("/", controller.landing_page);
router.get("/webdev", controller.web_development);
router.get("/aadp", controller.application_arch);
router.get("/lowperformance", controller.low_performance);

router.get("/failedprogramming", controller.fail_programming);
router.get("/passedprogramming", controller.pass_programming);
router.get("/failedse", controller.fail_se);
router.get("/passedse", controller.pass_se);
router.get("/failedwebdev", controller.fail_webdev);
router.get("/passedwebdev", controller.pass_webdev);
router.get("/failedaadp", controller.fail_aadp);
router.get("/passedaadp", controller.pass_aadp);

router.get("/api", controller.serveJson);

// 404 handler
router.use(function (req, res) {
  res.status(404).type("text/plain").send("404 Not found.");
});

// 500 handler
router.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).type("text/plain").send("Internal Server Error.");
});

export default router;

// models/studentModel.js (ES Modules + nedb-promises)

import Datastore from "nedb-promises";

export default class StudentDatabase {
  constructor(dbFilePath) {
    this.db = dbFilePath
      ? Datastore.create({ filename: dbFilePath, autoload: true })
      : Datastore.create(); // in-memory
    console.log(
      `DB ${dbFilePath ? "connected to " + dbFilePath : "created in memory"}`
    );
  }

  // ---------- Seed data ----------
  async init() {
    const docs = [
      {
        student: "Ross",
        age: 20,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 62 },
          { name: "Web Development", grade: 57 },
          { name: "Software Engineering", grade: 73 },
        ],
      },
      {
        student: "Ed",
        age: 20,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 40 },
          { name: "Web Development", grade: 54 },
          { name: "Software Engineering", grade: 63 },
        ],
      },
      {
        student: "Ann",
        age: 20,
        programme: "Computing",
        modules: [
          { name: "Programming", grade: 57 },
          { name: "Web Development", grade: 70 },
          { name: "Software Engineering", grade: 59 },
        ],
      },
      {
        student: "Ali",
        age: 23,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 36 },
          { name: "Application Architectures", grade: 36 },
          { name: "Software Engineering", grade: 66 },
        ],
      },
      {
        student: "Fred",
        age: 20,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 78 },
          { name: "Application Architectures", grade: 67 },
          { name: "Software Engineering", grade: 69 },
        ],
      },
      {
        student: "Colin",
        age: 20,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 61 },
          { name: "Application Architectures", grade: 42 },
          { name: "Software Engineering", grade: 70 },
        ],
      },
    ];

    // Insert all docs (in parallel)
    const inserted = await Promise.all(docs.map((doc) => this.db.insert(doc)));
    console.log(`Seed complete: ${inserted.length} documents inserted.`);
    return inserted;
  }

  // ---------- Query methods ----------
  async displayAll() {
    const entries = await this.db.find({});
    console.log("function returns: ", entries);
    return entries;
  }

  async displayWebDev() {
    const entries = await this.db
      .find({ "modules.name": "Web Development" })
      .sort({ student: 1 });
    console.log("function returns: ", entries);
    return entries;
  }

  async displayAppArch() {
    const entries = await this.db.find({
      "modules.name": "Application Architectures",
    });
    console.log("function returns: ", entries);
    return entries;
  }

  async displayLowPerformance() {
    const entries = await this.db.find({ "modules.grade": { $lt: 50 } });
    console.log("function lowPerformance returns: ", entries);
    return entries;
  }

  async displayFail(subject) {
    console.log(subject);
    const entries = await this.db
      .find({ modules: { $elemMatch: { name: subject, grade: { $lt: 40 } } } })
      .sort({ student: 1 });
    console.log("function returns: ", entries);
    return entries;
  }

  async displayPass(subject) {
    console.log(subject);
    const entries = await this.db
      .find({ modules: { $elemMatch: { name: subject, grade: { $gte: 40 } } } })
      .sort({ student: 1 });
    console.log("function returns: ", entries);
    return entries;
  }

  // ---------- Updates & Removes (nedb-promises) ----------
  /**
   * Update documents.
   * @param {object} query NeDB selector
   * @param {object} update Update operators or replacement doc
   * @param {object} options { multi?: boolean, upsert?: boolean, returnUpdatedDocs?: boolean }
   * @returns {Promise<number|any|{numAffected:number, affectedDocuments?:any}>}
   * - Returns number affected by default.
   * - If returnUpdatedDocs: true, returns the updated doc(s).
   */
  async updateAsync(query, update, options = {}) {
    // nedb-promises returns:
    // - number when returnUpdatedDocs: false (default)
    // - single doc or array when returnUpdatedDocs: true
    const result = await this.db.update(query, update, options);
    return result;
  }

  /**
   * Remove documents.
   * @param {object} query NeDB selector
   * @param {object} options { multi?: boolean }
   * @returns {Promise<number>} number of documents removed
   */
  async removeAsync(query, options = {}) {
    const numRemoved = await this.db.remove(query, options);
    return numRemoved;
  }
}

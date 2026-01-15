import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliPath = path.join(__dirname, "cli.js");
const fixtures = JSON.parse(
  fs.readFileSync(path.join(__dirname, "test-fixtures.json"), "utf8")
);

const runCli = async (payload) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cliPath]);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() });
    });

    child.stdin.write(
      typeof payload === "string" ? payload : JSON.stringify(payload)
    );
    child.stdin.end();
  });

test("CLI returns Big-5 scores", async () => {
  const payload = {
    ...fixtures.big5,
    test_type: "big5",
  };
  const result = await runCli(payload);
  assert.equal(result.code, 0);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.ok, true);
  assert.deepEqual(body.scores, fixtures.big5.expected);
});

test("CLI returns MBTI scores", async () => {
  const payload = {
    ...fixtures.mbti,
    test_type: "mbti",
  };
  const result = await runCli(payload);
  assert.equal(result.code, 0);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.ok, true);
  assert.equal(body.scores.type, fixtures.mbti.expected.type);
  assert.equal(body.scores.E + body.scores.I, 100);
  assert.equal(body.scores.S + body.scores.N, 100);
  assert.equal(body.scores.T + body.scores.F, 100);
  assert.equal(body.scores.J + body.scores.P, 100);
});

test("CLI rejects invalid responses", async () => {
  const payload = {
    ...fixtures.big5,
    test_type: "big5",
    answers: { 1: 0 },
  };
  const result = await runCli(payload);
  assert.equal(result.code, 1);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.ok, false);
  assert.match(body.error, /integer between 1 and 5/);
});

test("CLI rejects malformed JSON", async () => {
  const result = await runCli("{not-json}");
  assert.equal(result.code, 1);
  assert.equal(result.stderr, "");
  const body = JSON.parse(result.stdout);
  assert.equal(body.ok, false);
  assert.match(body.error, /Invalid JSON/);
});

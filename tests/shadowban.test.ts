import { describe, expect, it } from "vitest";
import { CHECK_IDS, parseUsername, shadowbanVerdict, testLinks, verdictSummary } from "@/lib/shadowban";

const all = (a: "ok" | "issue" | "unsure") => Object.fromEntries(CHECK_IDS.map((id) => [id, a]));

describe("parseUsername", () => {
  it("reads handles with or without @ and from profile or post URLs", () => {
    expect(parseUsername("growxapp")).toBe("growxapp");
    expect(parseUsername("  @Growx_App ")).toBe("Growx_App");
    expect(parseUsername("https://x.com/growxapp")).toBe("growxapp");
    expect(parseUsername("twitter.com/growxapp/status/123")).toBe("growxapp");
    expect(parseUsername("https://www.x.com/@growxapp?s=20")).toBe("growxapp");
  });
  it("rejects anything that is not a valid username", () => {
    expect(parseUsername("")).toBeNull();
    expect(parseUsername("has space")).toBeNull();
    expect(parseUsername("a".repeat(16))).toBeNull();
    expect(parseUsername("bad-name")).toBeNull();
    expect(parseUsername("https://x.com/home")).toBeNull();
    expect(parseUsername("https://x.com/search?q=x")).toBeNull();
  });
});

describe("testLinks", () => {
  it("builds the profile, Latest search and replies links", () => {
    const l = testLinks("growx_app");
    expect(l.profile).toBe("https://x.com/growx_app");
    expect(l.search).toBe("https://x.com/search?q=from%3Agrowx_app&src=typed_query&f=live");
    expect(l.replies).toBe("https://x.com/growx_app/with_replies");
  });
});

describe("shadowbanVerdict", () => {
  it("waits for answers", () => expect(shadowbanVerdict({}).level).toBe("none"));
  it("is clear only when every check is normal", () => {
    expect(shadowbanVerdict(all("ok")).level).toBe("clear");
    expect(shadowbanVerdict({ ...all("ok"), replies: "unsure" })).toMatchObject({ level: "incomplete", open: ["replies"] });
    expect(shadowbanVerdict({ status: "ok" }).level).toBe("incomplete");
  });
  it("names each limit found", () => {
    const one = shadowbanVerdict({ ...all("ok"), search: "issue" });
    expect(one).toMatchObject({ level: "warning", issues: ["search"], title: "Signs of a search ban" });
    const two = shadowbanVerdict({ ...all("ok"), suggest: "issue", replies: "issue" });
    expect(two.title).toBe("Signs of a shadowban: 2 limits found");
    expect(two.summary).toContain("search suggestion ban and reply deboosting (ghost ban)");
  });
  it("puts account problems and notices from X first", () => {
    expect(shadowbanVerdict({ ...all("issue") }).level).toBe("restricted");
    expect(shadowbanVerdict({ ...all("ok"), notices: "issue" }).title).toBe("X has limited your account or a post");
  });
  it("summarises the answers for copying", () => {
    const answers = { ...all("ok"), search: "issue" as const, notices: undefined };
    const text = verdictSummary("growx_app", answers, shadowbanVerdict(answers), "https://www.growxapp.org/tools/twitter-shadowban-checker");
    expect(text).toContain("X shadowban test for @growx_app");
    expect(text).toContain("- Search results: problem");
    expect(text).toContain("- Notices from X: not checked");
  });
});

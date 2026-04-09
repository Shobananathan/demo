import { test, expect } from "@playwright/test";
import { skip } from "node:test";

test.skip("alerts", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //alert

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("I am an alert box!");
    await dialog.accept();
  });
  await page.locator("#alertBtn");
});

// confirm

test.skip("confirmationalerts", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("confirm");
    expect(dialog.message()).toContain("Press a button!");
    await dialog.accept();
  });
  await page.locator("#confirmBtn").click();
  expect(page.locator("#demo")).toHaveText("You pressed OK!");
});

//prompt

test("promptalerts", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("prompt");
    expect(dialog.message()).toContain("Please enter your name:");
    dialog.defaultValue("Harry Potter");
    await dialog.accept("Smith");
  });
  await page.locator("#promptBtn").click();
  expect(page.locator("#demo")).toHaveText("Hello Smith! How are you today?");
  await page.waitForTimeout(5000);
});

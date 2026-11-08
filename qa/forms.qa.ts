import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("required fields and consent are enforced by the browser", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Enquiry" }).click();
    const invalid = await page.locator("form :invalid").count();
    expect(invalid).toBeGreaterThan(0);
    await expect(page.getByText("Your enquiry has been received")).toHaveCount(0);
  });

  test("a wrong email is rejected by the server too", async ({ request }) => {
    const response = await request.post("/api/enquiries/contact", {
      data: {
        name: "QA Tester",
        email: "not-an-email",
        subject: "Other",
        message: "Checking validation from the automated QA suite.",
        privacyAccepted: true,
      },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.fieldErrors?.email).toBeTruthy();
  });

  test("a complete enquiry is accepted", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("QA Tester");
    await page.getByLabel("Business Email").fill("qa.tester@example.com");
    await page.getByLabel("What is this about?").selectOption("Other");
    await page.getByLabel("Message").fill("Automated QA check of the contact form. Please ignore.");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Send Enquiry" }).click();
    await expect(page.getByText("Thank you. Your enquiry has been received.")).toBeVisible();
  });

  test("shows what happens next, WhatsApp and the map link", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("[data-what-happens-next]")).toContainText("one working day");
    await expect(page.getByRole("link", { name: "Chat on WhatsApp" })).toHaveAttribute(
      "href",
      "https://wa.me/919175768019",
    );
    await expect(page.getByRole("link", { name: /Open in Google Maps/ })).toBeVisible();
  });
});

test("consultation request: service interest is required", async ({ page }) => {
  await page.goto("/contact?topic=consultation");
  await expect(page.getByLabel("Service interest")).toBeVisible();
  await page.getByRole("button", { name: "Request a Consultation" }).last().click();
  expect(await page.locator("form :invalid").count()).toBeGreaterThan(0);
});

test("Academy launch list accepts a sign-up", async ({ page }) => {
  await page.goto("/academy");
  const form = page.locator("#launch-list form");
  await form.getByLabel("Name").fill("QA Learner");
  await form.getByLabel("Email").fill("qa.learner@example.com");
  await form.getByLabel(/Course of interest/).selectOption({ index: 1 });
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Join Launch List" }).click();
  await expect(page.getByText("You have joined the FaizZab Academy launch list")).toBeVisible();
});

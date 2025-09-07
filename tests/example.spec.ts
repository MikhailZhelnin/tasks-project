import { test, expect } from '@playwright/test';

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("shoud have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle("Playwright");
    await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Tasks" })).toBeVisible();
  });

  test("should redirect to tasks page", async ({ page }) => {
    await page.getByRole("link", { name: "Tasks" }).click();
    await expect(page.getByRole("heading", { name: "Your tasks" })).toBeVisible();
  });
});

test.describe("Tasks Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/tasks");
  });

  test("shoud have correct metadata and elements", async ({ page }) => {
    await expect(page).toHaveTitle("Playwright");
    await expect(page.getByRole("heading", { name: "Your tasks" })).toBeVisible();
    await expect(page.getByPlaceholder("Enter your task...")).toBeVisible();
    await expect(page.getByRole("button", { name: "Add new task" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Clear" })).toBeVisible();
  });

  test("should have empty tasks list on start", async ({ page }) => {
    const tasksEmptyList = page.getByTestId("empty-tasks-list");

    await expect(tasksEmptyList).toHaveText("You don't have any tasks. Please add at least one.");
  });

  test("should add task to list", async ({ page }) => {
    const input = page.getByPlaceholder("Enter your task...");
    const task = page.getByTestId("task").nth(0);

    await input.fill("Item 1");
    await page.getByRole("button", { name: "Add new task" }).click();
    await expect(task).toHaveText("1: Item 1");
    await expect(input).toBeEmpty();
  });

  test("should clear tasks list", async ({ page }) => {
    const input = page.getByPlaceholder("Enter your task...");
    const task = page.getByTestId("task").nth(0);
    const tasksEmptyList = page.getByTestId("empty-tasks-list");

    await input.fill("Item 1");
    await page.getByRole("button", { name: "Add new task" }).click();
    await expect(task).toHaveText("1: Item 1");
    await expect(input).toBeEmpty();
    await page.getByRole("button", { name: "Clear" }).click();
    await expect(tasksEmptyList).toHaveText("You don't have any tasks. Please add at least one.");
  });
});
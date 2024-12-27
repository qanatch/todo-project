import {TodoPage} from "./pages/todo-page";
import {expect, test} from "@playwright/test";


let todoPage: TodoPage

test.beforeEach(async ({page}) => {
    todoPage = new TodoPage(page)
    await todoPage.openToDoPage()
})

test('Has title', async ({page}) => {
    await expect(todoPage.pageLogo).toBeVisible()
});

test('create new  ToDo task ', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    expect(await todoPage.counterToDoItems()).toBe(1)
});

test('Delete ToDo task by name', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await  todoPage.deleteToDoTaskByName('newTask')
    expect(await todoPage.counterToDoItems()).toBe(0)
});

test('complete ToDo task by name', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await  todoPage.completeToDoTaskByName('newTask')
    await  todoPage.checkCompleteTaskByName('newTask')

});

test('button All,Active Completed,Clear are visible', async ({page}) => {
    await todoPage.inputField.fill('newTask')
    await todoPage.inputField.press('Enter')
    await expect.soft(todoPage.filterActive).toBeVisible()
    await expect.soft(todoPage.filterAll).toBeVisible()
    await expect.soft(todoPage.filterCompleted).toBeVisible()
    await expect.soft(todoPage.buttonClearCompletedTasks).toBeVisible()
});

test('Toggle all tasks', async ({page}) => {
    await todoPage.inputField.fill('Task 1');
    await todoPage.inputField.press('Enter');
    await todoPage.inputField.fill('Task 2');
    await todoPage.inputField.press('Enter');


    expect(await todoPage.counterToDoItems()).toBe(2);
    await todoPage.buttonSelectAll.click();

    for (const taskName of ['Task 1', 'Task 2']) {
        await todoPage.checkCompleteTaskByName(taskName);
    }
    await todoPage.buttonClearCompletedTasks.click();
    expect(await todoPage.counterToDoItems()).toBe(0);
});
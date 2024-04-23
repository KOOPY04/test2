// 資料儲存陣列
let tasks = [];
let editingIndex = -1; // 追踪當前正在編輯的代辦事項的索引

// 畫面載入後執行
window.onload = function() {
    displayTasks();
};

// 新增待辦事項
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("請輸入待辦事項！");
        return;
    }
    showClearButton(); // 新增時檢查是否顯示清除按鈕

    if (editingIndex > -1) {
        // 如果正在編輯中，則更新該代辦事項
        tasks[editingIndex] = taskName;
        editingIndex = -1; // 更新完成後取消編輯模式
    } else {
        // 否則新增代辦事項
        tasks.push(taskName);
    }

    displayTasks();
    taskInput.value = "";

    // 將新增按鈕文字設置為 "新增"
    const addBtn = document.getElementById("addButton");
    addBtn.textContent = "新增";
}

// 顯示待辦事項列表
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const editBtn = document.createElement("button");
        editBtn.textContent = editingIndex === index ? "更新" : "編輯";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "刪除";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    showClearButton(); // 新增時檢查是否顯示清除按鈕
}

// 編輯待辦事項
function editTask(index) {
    const taskInput = document.getElementById("taskInput");

    if (editingIndex === index) {
        // 如果正在編輯中，則更新代辦事項
        const newTaskName = taskInput.value.trim();
        if (newTaskName === "") {
            alert("請輸入新的待辦事項！");
            return;
        }
        tasks[index] = newTaskName;
        editingIndex = -1; // 更新完成後取消編輯模式
    } else {
        // 否則將代辦事項填充到輸入框中
        taskInput.value = tasks[index];
        editingIndex = index; // 設置當前正在編輯的索引
    }

    displayTasks();

    // 根據編輯模式設置新增按鈕的文字
    const addBtn = document.getElementById("addButton");
    addBtn.textContent = editingIndex > -1 ? "編輯" : "新增";
}

// 刪除待辦事項
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
    showClearButton(); // 刪除後檢查是否顯示清除按鈕
}

// 清除所有待辦事項
function clearAll() {
    tasks = [];
    displayTasks();
    showClearButton(); // 清除後檢查是否顯示清除按鈕
}

// 顯示或隱藏清除按鈕
function showClearButton() {
    const clearButton = document.getElementById("clearButton");
    if (tasks.length > 0) {
        clearButton.style.display = "block";
    } else {
        clearButton.style.display = "none";
    }
}

// 在輸入框按下 Enter 鍵時觸發新增代辦事項的功能
const taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keyup", function(event) {
    // 判斷是否按下的是 Enter 鍵 (keyCode 為 13)
    if (event.keyCode === 13) {
        event.preventDefault(); // 防止觸發預設的提交行為
        addTask(); // 觸發新增代辦事項
    }
});

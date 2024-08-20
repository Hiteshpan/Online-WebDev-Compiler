import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
    fullCode: {
        html: string;
        css: string;
        javascript: string;
    };
    currentLanguage: "html" | "css" | "javascript";
};

const initialState: CompilerSliceStateType = {
    fullCode: {
        html:
            `<html lang="en">
<body>
    <div class="todo-container">
        <h1>To-Do List</h1>
        <input type="text" id="new-task" placeholder="Add a new task...">
        <button id="add-task-btn">Add Task</button>
        <ul id="task-list"></ul>
    </div>
  <script src="script.js"></script>
</body>
</html>`,
        css: `body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.todo-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

h1 {
    margin-bottom: 20px;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    outline: none;
}

button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    margin-bottom: 20px;
}

button:hover {
    background-color: #218838;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #f9f9f9;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li.completed {
    text-decoration: line-through;
    color: #888;
}

.delete-btn {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
}

.delete-btn:hover {
    background: #c82333;
}
`,
        javascript:
            ` document.getElementById('add-task-btn').addEventListener('click', function() {
 const taskText = document.getElementById('new-task').value;

 if (taskText.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
    });

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteBtn);

    taskItem.addEventListener('click', function() {
        taskItem.classList.toggle('completed');
    });

    document.getElementById('task-list').appendChild(taskItem);
    document.getElementById('new-task').value = '';
});

        `,
    },
    currentLanguage: "html",
};

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
            state.currentLanguage = action.payload;
        },
        updateCodeValue: (
            state,
            action: PayloadAction<string>) => {
            state.fullCode[state.currentLanguage] = action.payload;
        }
    },
});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue } = compilerSlice.actions;
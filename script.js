






const newTaskForm = document.querySelector('[task-new-list-form]')
const newTaskInput = document.querySelector('[task-new-list-input]')
const taskDisplayConatiner = document.querySelector('[task-list-display-container]')
const taskCountElement = document.querySelector('[task-list-count]')
const taskContainer = document.querySelector('[task-data]')
const taskTemplate = document.getElementById('task-template')
const allTaskButton = document.querySelector('[all-task-button]')
const activeTaskButton = document.querySelector('[active-task-button]')
const completedTaskButton = document.querySelector('[completed-task-button]')
const clearTaskButton = document.querySelector('[clear-task-button]')









const LOCAL_STORAGE_LIST_KEY = 'task.lists'
let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []


activeTaskButton.addEventListener('click', e=> {
    const activeTodo = todos.filter(todo => !todo.complete)
    todos = activeTodo
    render()
})


completedTaskButton.addEventListener('click', e=> {
    const activeTodos = todos.filter(todo => todo.complete)
    todos = activeTodos
    render()
})


clearTaskButton.addEventListener('click', e => {
    const todosList = todos.filter(todo => !todo.complete)
    todos = todosList
    saveAndRender()
})

taskContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'input'){
        const allTasks = todos.find(todo => todo.id === e.target.id)
        allTasks.complete = e.target.checked
        save()
        renderTaskCount()
    }
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === "") return
    const todo = createTask(taskName)
    newTaskInput.value = null
    todos.push(todo)
    saveAndRender()

})


function createTask (name) {
    return {id: Date.now().toString(), name: name, complete: false}
}

function saveAndRender(){
    save()
    render()
}


function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(todos))
}


function render() {
    clearElement(taskContainer)
    renderTask()
    renderTaskCount()
}


function renderTask(){
    todos.forEach(todo => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = todo.id
        checkbox.checked = todo.complete
        // const deleteButton = taskElement.getElementById('custom-delete')
        // deleteButton.id = todo.id
        // deleteButton.addEventListener()
        const label = taskElement.querySelector('label')
        label.htmlFor = todo.id
        label.append(todo.name)
        taskContainer.appendChild(taskElement)
        
    })
}

function renderTaskCount(){
    const incompleteTaskCount = todos.filter(todo => !todo.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    taskCountElement.innerText = `${incompleteTaskCount} ${taskString} left`
}

function clearElement(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}


render()
const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

// item들을 저장해둘 빈 배열
let todos = [];

// 버튼 이벤트 추가
createBtn.addEventListener('click', createNewTodo);

// createBtn 버튼을 눌렀을 때 발생하는 이벤트
function createNewTodo () {

    // 객체 인스턴스 생성
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }

    // todos 배열 첫 번째 요소로 추가
    todos.unshift(item);

    // 요소 생성 함수 호출 및 반환
    const { itemEl, inputEl, editBtnEl, removeBtnEl } = createTodoElement(item);

    // list 태그의 마지막 자식으로 추가
    list.prepend(itemEl);

    // 
    inputEl.removeAttribute('disabled');

    // 생성된 todo의 input에 바로 포커스 기능
    inputEl.focus();

    // 새로운 item이 추가가 된 todos 배열을 로컬 스토리지에 저장
    saveToLocalStorage();
}

// 요소를 만드는 함수
function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if (item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circle';

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if (item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
        saveToLocalStorage();
    })

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })
    
    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

// 로컬 스토리지에 저장
function saveToLocalStorage() {
    const data = JSON.stringify(todos);

    localStorage.setItem('my_todos', data);
}

// 로컬 스토리지에서 불러오기
function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if (data) {
        todos = JSON.parse(data);
    }
}

// 새로고침을 했을 때 로컬 스토리지에 저장된 정보를 반영하여 화면에 그려주기
function displayTodos() {
    loadFromLocalStorage();

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];
        const { itemEl } = createTodoElement(item);

        list.append(itemEl);
    }
}

displayTodos();
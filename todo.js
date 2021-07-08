    const form = document.querySelector("#todo-form");
    const todoInput = document.querySelector("#todo");
    const todoList = document.querySelector(".list-group");
    const firstCardBody = document.querySelectorAll(".card-body")[0];
    const secondCardBody = document.querySelectorAll(".card-body")[1];
    const filter = document.querySelector("#filter");
    const clearButton = document.querySelector("#clear-todos");

    eventListeners();

    function eventListeners(){
            form.addEventListener("submit",addTodo);
            document.addEventListener("DOMContentLoaded",loadedTodosUI);
            secondCardBody.addEventListener("click",deleteTodo);    
            filter.addEventListener("keyup",filterTodos);    
            clearButton.addEventListener("click",clearAllTodos);
    }

    function clearAllTodos(e){
        if(confirm("Tümünü temizlemek istediğinize emin misiniz?")){
            // todoList.innerHTML=""; yavaş 
            while(todoList.firstElementChild != null){
                todoList.removeChild(todoList.firstElementChild);
            }
            localStorage.removeItem("todos");
        }

    }

    function filterTodos(e){
        // e.target.value 
        // büyük küçük harf duyarlılığı için hepsini küçük yapıyoruz.
        const filterValue = e.target.value.toLowerCase();
        const listItems = document.querySelectorAll(".list-group-item");

        listItems.forEach(function(listItem){
            const text = listItem.textContent.toLowerCase();
            if(text.indexOf(filterValue) === -1){
                listItem.setAttribute("style","display : none !important");
            }
            else {
                listItem.setAttribute("style","display : block");
            }
            });
    }

    function deleteTodo(e){
        // nereye basıldığını verir.
       // console.log(e.target);
       if(e.target.className === "fa fa-remove"){
           e.target.parentElement.parentElement.remove();
           deleteTodoStorage(e.target.parentElement.parentElement.textContent);
           showAlert("success","Todo başarıyla silindi.")

       }

    }

    function deleteTodoStorage(deleletodo){  
        let todos = getTodosFromStorage();
        todos.forEach(function(todo,index){

            if(todo === deleletodo){
                todos.splice(index,1);
            }
        });

        localStorage.setItem("todos",JSON.stringify(todos));
    }

    function loadedTodosUI(){
        let todos = getTodosFromStorage();
        todos.forEach(function (todo) {
            addtodoToUI(todo);
        });

    }

    function addTodo(e){

        const newTodo = todoInput.value.trim();
        if(newTodo === ""){
            /*        <div class="alert alert-danger" role="alert">
                            A simple danger alert—check it out!
                        </div> */

            showAlert("danger", "Lütfen bir todo girin.");
        }
        else{
            addtodoToUI(newTodo);
            showAlert("success", "TOdo başarıyla eklendi.");
            addTodoStorage(newTodo);
        }


        e.preventDefault();
    }

    function getTodosFromStorage(){
        
        let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];

        }
        else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;


    }

    function addTodoStorage(newTodo){
        
        let todos = getTodosFromStorage();
        todos.push(newTodo);
        localStorage.setItem("todos",JSON.stringify(todos));

    }

    function showAlert(type,message){
        const alert = document.createElement("div");
        alert.className=`alert alert-${type}`;
        alert.textContent =message;

        firstCardBody.appendChild(alert);

        //settimeout
        setTimeout(function(){
        alert.remove();
        },1000);

    }

    function addtodoToUI(newTodo){
    /*   <!-- <li class="list-group-item d-flex justify-content-between">
                                Todo 1
                                <a href = "#" class ="delete-item">
                                    <i class = "fa fa-remove"></i>
                                </a>

                            </li>--> */
    //list item oluşturma
        const listItem = document.createElement("li");
    //link  oluşturma
        const link = document.createElement("a");
        link.href = "#";
        link.className = "delete-item";
        link.innerHTML = "  <i class = 'fa fa-remove'></i>";
        listItem.className = "list-group-item d-flex justify-content-between";
        // text node ekleme
        listItem.appendChild(document.createTextNode(newTodo));
        listItem.appendChild(link);

        // todo liste list item ekle

        todoList.appendChild(listItem);
        todoInput.value="";



    }
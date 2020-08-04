window.addEventListener('DOMContentLoaded', function() {

    //document.getElementById

    const todoLista = document.querySelector('#todoLista');
    const inputText = document.querySelector('#todoInput');
    const todoSubmit = document.querySelector('#todoSubmit');
    const todoForm = document.querySelector('#todoForm');
    const marcarTodos = document.querySelector('#todoMarcarTodos');
    const removerTodos = document.querySelector('#todoRemoverTodos');
    let todosFeitos = false; // Controla se todas as tarefas estao ticadas. Valor eh false quando ao menos uma nao esta e true caso todas estejam


    function addTarefa() {
        event.preventDefault();
        if (document.getElementById("todoInput").value == undefined ||
            document.getElementById("todoInput").value.trim() == "") {
            alert('Por favor, preencha o campo');
            //reseta o formulario
            todoForm.reset();
            return false;
        };
        //cria li 
        const tarefa = document.createElement('li');
        //atribui a caracteristica draggable para todo li criado, para que possa ser arrastado
        tarefa.setAttribute('draggable', true);


        //evento adicionado ao ul (todoLista). dragstart é o começo, o que vamos agarrar (drag)
        todoLista.addEventListener('dragstart', function(e) {
                dragging = e.target.closest('li')
            })
            //closest pega o elemento mais proximo da caixa principal onde rola o evento

        //dragover é pra arrastar o elemento. funciona como uma sobra que segura o elemento que estava no start, pra poder deslocar
        todoLista.addEventListener('dragover', function(e) {
            //prevent default pra permitir arrastar. o padrao de drag é agarrar e soltar
            e.preventDefault()
                //closest pega o elemento mais proximo da caixa principal
            const node = e.target.closest('li')
            this.insertBefore(dragging, node)
        })

        //dragend é o lugar onde vamos soltar, ou seja, fazer o drop
        todoLista.addEventListener('dragend', function(e) {
            dragging = null //valor null pra conseguirmos pegar outros elementos pra arrastar
        })

        //cria checkbox
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", inputText.value);
        checkbox.setAttribute("name", inputText.value); 
        checkbox.addEventListener("input", checarTodosMarcados) // Chama checar todos marcados porque o valor da variavel todosFeitos pode precisar ser atualizado
        tarefa.appendChild(checkbox);

        //mudar linha
        function sublinhado(){
        document.getElementById("todoInput").style.fontStyle = "italic";
        }

        //cria label
        let label = document.createElement('label');
        label.innerHTML = inputText.value;
        label.setAttribute("for", inputText.value);
        tarefa.appendChild(label);

        
        //botão de fechamento
        let button = document.createElement('button');
        button.innerText = "x";
        tarefa.appendChild(button);
        button.addEventListener('click', () => {
            todoLista.removeChild(tarefa);
        })

        // function feita() {
        //     if (checkbox.checked == true) {
        //         document.getElementById('label').style.color = "grey";
        //     }
        // }
        // checkbox.addEventListener('click', feita)

        //adiciona tarefa na lista
        todoLista.appendChild(tarefa);
        //reseta o formulario
        todoForm.reset();
    }

    //botao de remover
    function remover() {
        if (!confirm(`tem certeza que deseja apagar todas as tarefas?`)) {
            return;
        }
        const todoLista = document.getElementById("todoLista");
        while (todoLista.firstChild) {
            todoLista.removeChild(todoLista.firstChild)
        }
    }

    // Verifica se todos os checkboxes estao ticados e atualiza a variavel de controle chamada todosFeitos (declarada no topo)
    function checarTodosMarcados() {
        const todosOsCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]'));
        console.log(typeof todosOsCheckbox)
        if (todosOsCheckbox.length === 0) {
            todosFeitos = false;
        } else {
            todosFeitos = todosOsCheckbox.every(checkboxIndividual => checkboxIndividual.checked === true);
        }
    }

    function marcarDesmarcarTodos() {
        if (todosFeitos) { // Desmarca todos
            const todosOsCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]'));
            todosOsCheckbox.forEach(checkboxIndividual => checkboxIndividual.checked = false)
        } else { // Marca todos
            const todosOsCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]'));
            todosOsCheckbox.forEach(checkboxIndividual => checkboxIndividual.checked = true)
        }

        checarTodosMarcados() // Atualiza o valor de todosFeitos
        marcarTodos.innerText = todosFeitos ? 'desmarcar todos' : 'marcar todos'

    }

    //escutadores
    todoSubmit.addEventListener('click', addTarefa);

    removerTodos.addEventListener('click', remover);

    marcarTodos.addEventListener('click', marcarDesmarcarTodos);

    

})
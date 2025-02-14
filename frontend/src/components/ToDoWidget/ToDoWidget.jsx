import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {FiTrash, FiCheckSquare, FiSquare} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, clearCompleted, removeTodo, toggleTodoCompletion} from "../../store/slices/generalSlice.js";

const WidgetContainer = styled.div`
    background: #a2c1d8;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    padding: 30px;
    max-width: 400px;
    margin: 20px auto;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    }
`;

const Title = styled.h3`
    font-size: 24px;
    color: #115191;
    text-align: center;
    margin-bottom: 20px;
`;

const TodoInput = styled.input`
    width: 100%;
    padding: 15px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #90caf9;
    margin-bottom: 20px;
    outline: none;
    transition: 0.3s;

    &:focus {
        border-color: #1976d2;
    }
`;

const TodoButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #115191;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #1565c0;
    }
`;

const TodoList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const TodoItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #90caf9;
    font-size: 18px;
    transition: 0.3s;
    position: relative;

    &:hover {
        background-color: #bbdefb;
        transform: translateX(5px);
    }
`;

const TodoText = styled.span`
    flex-grow: 1;
    text-decoration: ${({completed}) => (completed ? "line-through" : "none")};
    color: ${({completed}) => (completed ? "#888" : "#1976d2")};
    font-weight: ${({completed}) => (completed ? "400" : "500")};
    transition: 0.3s;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #1976d2;
    transition: 0.3s;
    margin-left: 15px;

    &:hover {
        color: #1565c0;
    }
`;

const ClearCompletedButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #115191;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    transition: 0.3s;

    &:hover {
        background-color: #0277bd;
    }
`;

const ToDoWidget = () => {
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const todos = useSelector((state) => state.general.todos);


    const handleInputChange = (e) => {
        setTask(e.target.value);
    };



    const handleAddTask = () => {
        if (task.trim()) {
            const newTodo = {id: Date.now(), text: task, completed: false};
            dispatch(addTodo(newTodo));
            setTask("");
        }
    };

    const handleToggleCompletion = (id) => {
        dispatch(toggleTodoCompletion(id));
    };

    const handleRemoveTask = (id) => {
        dispatch(removeTodo(id));
    };

    const handleClearCompleted = () => {
        dispatch(clearCompleted());
    };

    return (
        <WidgetContainer>
            <Title>Dream destinations</Title>
            <TodoInput
                type="text"
                placeholder="Add a new destination..."
                value={task}
                onChange={handleInputChange}
            />
            <TodoButton onClick={handleAddTask}>Add destination</TodoButton>

            <TodoList>
                {todos.map((todo) => (
                    <TodoItem key={todo.id}>
                        <TodoText completed={todo.completed} onClick={() => handleToggleCompletion(todo.id)}>
                            {todo.text}
                        </TodoText>
                        <div>
                            <IconButton onClick={() => handleToggleCompletion(todo.id)}>
                                {todo.completed ? <FiCheckSquare/> : <FiSquare/>}
                            </IconButton>
                            <IconButton onClick={() => handleRemoveTask(todo.id)}>
                                <FiTrash/>
                            </IconButton>
                        </div>
                    </TodoItem>
                ))}
            </TodoList>

            {todos.some((todo) => todo.completed) && (
                <ClearCompletedButton onClick={handleClearCompleted}>
                    Clear Completed
                </ClearCompletedButton>
            )}
        </WidgetContainer>
    );
};

export default ToDoWidget;

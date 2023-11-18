import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./Crud.css";
import { MdDoneOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function Crud() {
  const [type, setType] = useState("");
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTodo = () => {
    if(type !== ''){
      setTodo([...todo,{list : type , id : Date.now(),status : false}]);
      console.log(todo);
      setType("");
    }
    if (editId) {
      const editTodo =todo.find((dt)=>dt.id == editId)
      const updateTodo = todo.map((dt)=>dt.id === editTodo.id
      ? (dt ={id : dt.id , list : type})
      : (dt ={id : dt.id , list : dt.list}) )
      setTodo(updateTodo)
      setEditId(0)     
    }
    
  };
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete =(id)=>{
   setTodo( todo.filter((dlt)=> dlt.id !== id))
  }

  const onComplete =(id)=>{
    const complete = todo.map((list)=>{
      if(list.id === id){
        return ({status : !list.status})
      }
      return list
    })
    setTodo(complete)
  }
  const onEdit =(id)=>{
    const editTodo = todo.find((edt)=>edt.id=== id)
    setType(editTodo.list)
    setEditId(editTodo.id)

  }

  return (
    <div className="container">
      <h1>TODO APP</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          ref={inputRef}
          value={type}
          placeholder="Enter your todo..."
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <Button onClick={addTodo} className="btn">
          {editId ? 'EDIT' : 'ADD'}
        </Button>
        <div className="list">
          <ul>
            {todo.map((data) => (
              <li className="list-items">
                <div className="list-item-list" id={data.status ? 'list-item': ''}>
                  
                  <h5>
                    {data.list}
                    <span className="icons">
                      <MdDoneOutline
                        className="icon"
                        id="complete"
                        title="complete"
                        style={{ color: "green" }}
                        onClick={()=>{onComplete(data.id)}}
                      />
                      <FaEdit
                        className="icon"
                        id="edit"
                        title="edit"
                        style={{ color: "blue" }}
                        onClick={()=>{onEdit(data.id)}}
                      />
                      <AiFillDelete
                        className="icon"
                        id="delete"
                        title="delete"
                        style={{ color: "red" }}
                        onClick={()=>{onDelete (data.id)}}
                      />
                    </span>
                  </h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default Crud;

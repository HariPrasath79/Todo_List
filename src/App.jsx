
import React, { useState } from 'react';
import './index.css'
import {FaTrash} from 'react-icons/fa'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {


  const [list, setList] = useState(JSON.parse(localStorage.getItem("todo_list")) ||[]);

  const [newItem, setNewItem] = useState("")

  const addItem = (item)=>{
    
    const id = list.length ? list.length : 0
    const addNewItem = {id, checked:false, item}
    const listItems = [...list, addNewItem]
    setList(listItems)
    localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  const handlecheck = (id)=>{
    
    const newList = list.map( (item)=>
      item.id === id ? {...item, checked: !item.checked} : item
    )
    setList(newList)
    localStorage.setItem("todo_list", JSON.stringify(newList))
  }

  const deleteItem = (id)=>{

    const newList =list.filter((item)=> item.id !== id)
    setList(newList)
    localStorage.setItem("todo_list", JSON.stringify(newList))
  }

  const handleSubmit = (e)=>{
   e.preventDefault()
   console.log('submitted')
   if(!newItem) return
   addItem(newItem)
   setNewItem("")
  }

  return (
    <div className='central'>
      <div className='content col-8'>
      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <form onSubmit={handleSubmit}>
          <input
          autoFocus
          type="text" id="newItem"
          name= "newItem"
          required
          className='input_new' 
          placeholder="Add Item"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
          />
          <button 
          className="addBtn"
          >Add</button>
        </form>
      </div>

      { (list.length)?(
        <ul id="myUL">
        {
          list.map((x) =>(
            <li className='list' key={x.id}>
            <input 
            type='checkbox' 
            checked = {x.checked}
            onChange={() => handlecheck(x.id)}
            >
            </input>
            <label
              className='lableitem'
              style={(x.checked)?{textDecoration: 'line-through'}:null}
              onClick={()=>handlecheck(x.id)}
            >{x.item}
            </label>
            <FaTrash
            role='button'
            onClick={()=>deleteItem(x.id)}/>
            </li>
          ))
        }
      </ul>
      ): (
        <p className='emptylist' style={{marginTop: '2rem', color: 'white'}}>Your list is empty</p>
      )
      }
      
      </div>
      </div> 
  )
}

export default App

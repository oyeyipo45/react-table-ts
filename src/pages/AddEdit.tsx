import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAddContactMutation, useGetContactQuery, useUpdateContactMutation } from '../services/contactsApi'

const initialState = {
  name: "",
  email: "",
  contact: ""
}
const AddEdit = () => {
  
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState(initialState)
  const [editMode, setEditMode] = useState(false)

  const [addContact] = useAddContactMutation()
  const [updateContact] =  useUpdateContactMutation()
     

  const { name, email, contact } = formValue

  const { id } = useParams()

  const { data, error } = useGetContactQuery(id!)

  useEffect(() => {
    if(error && id) {
        toast.error("Something went wrong")
      }
  }, [error])
  
  console.log(data)

  useEffect(() => {
    
    if (id) {
      setEditMode(true)
      if (data) {
        setFormValue({...data})
      }
      
    } else {
      setEditMode(false)
      setFormValue({...initialState})
    }
  }, [id, data])


  const handleInput = (e: any) => {
    let { name, value } = e.target;
    setFormValue(({ ...formValue, [name] : value}))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!name && !email && !contact) {
      toast.error("Please fill all fields")
    } else {
      if (!editMode) {
         let data = await addContact(formValue)
          if (data) {
            navigate('/')
            toast.success("Contact added successfully")
          }
      } else {
        let data = await updateContact(formValue)
        if (data) {
          navigate('/')
          setEditMode(false)
            toast.success("Contact updated successfully")
          }
      }
    }
  }


  return (
    <div style={{ marginTop: "100px" }}>
      <form action=""
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name.."
          value={name}
          onChange={handleInput}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email.."
          value={email}
          onChange={handleInput}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter contact no.."
          value={contact}
          onChange={handleInput}
        />
        <input type="submit" value={editMode ? "Update" : "Add"} />
    </form>
    </div>
  )
}

export default AddEdit
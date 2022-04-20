import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContactsQuery, useDeleteContactMutation} from '../services/contactsApi'

const Home = () => {
    const {data, isLoading, error} = useContactsQuery()

    const [deleteContact] = useDeleteContactMutation()

    useEffect(() => {
      if(error){
          toast.error("something went wrong")
      }
    }, [error])
    
    if (isLoading) {
      return (<div>Loading ...</div>  )
    }
    const handleDelete = async (id: any) => {
        if (window.confirm("Are you sure you want to delete this contact")) {
            await deleteContact(id)
            toast.success("Contact deleted")
        }
    }
  return (
      <div style={{ marginTop: "100px" }}>
         
          <Link to="/addContact"  >
              <button className='btn btn-add'
                  >Add contact</button>
          </Link>
            <br />
            <br/>
          <table className="styled-table">
              <thead>
                  <tr>
                      <th style={{ textAlign: "center" }}>No.</th>
                      <th style={{ textAlign: "center" }}>Name</th>
                      <th style={{ textAlign: "center" }}>Email</th>
                      <th style={{ textAlign: "center" }}>Contact</th>
                      <th style={{textAlign : "center"}}>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {data?.map(( item: any, index : any ) => {
                      return (
                          <tr className="key" key={item.id}>
                              <th scope='row'>{index + 1}</th>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.contact}</td>
                              <td>
                                  <Link to={`/editContact/${item.id}`}>
                                      <button className="btn btn-edit">Edit</button>
                                  </Link>
                                  <button className="btn btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                   <Link to={`/info/${item.id}`}>
                                      <button className="btn btn-view">View</button>
                                    </Link>
                                 
                              </td>
                          </tr>
                          
                      )
                  })}
              </tbody>


        </table>
    </div>
  )
}

export default Home
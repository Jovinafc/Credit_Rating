import React from 'react'

const ActionButton = ( { editForm, setEditForm, resetForm, onSumitForm, selectedMortgage, deleteMortgage }) => {
  return (
    <div className='action-div'>
    {
        editForm &&
        <button className="action-button" style={{ width: "100px" }} onClick={() => resetForm()} >
            <span className="action-span">Add New</span>
        </button>
    }
    {
        editForm &&
        <button className="action-button" style={{ width: "100px" }} onClick={() => setEditForm(false)} >
            <span className="action-span">Edit</span>
        </button>
    }
    {
        !editForm &&
        <button className="action-button" style={{ width: "100px" }}  
        onClick={onSumitForm}
        >
            <span className="action-span">Save</span>
        </button>
    }
    {
        !editForm && selectedMortgage &&
        <button className="action-button" style={{ width: "100px" }} 
        onClick={() => setEditForm(true)} 
        >
            <span className="action-span">Cancel</span>
        </button>
    }
    {
        editForm &&
        <button className="action-button" style={{ width: "100px" }} 
        onClick={deleteMortgage}
        >
            <span className="action-span">Delete</span>
        </button>
    }
</div>

  )
}

export default ActionButton
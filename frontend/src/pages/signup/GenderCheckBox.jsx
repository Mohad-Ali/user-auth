import React from 'react'

const GenderCheckBox = ({onhandleCheck,selectedGender}) => {
  return (
    <div className='flex'>
            <div className="form-control">
                <label className = {`label gap-2 cursor-pointer ${selectedGender==="male" ? "selected" : ""}`}>
                    <span className="label-text">Male</span>
                    <input type="checkbox" className="checkbox border-2 border-slate-900 " checked={selectedGender==="male"} onChange={()=>onhandleCheck("male")} />
                </label>
        </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer ${selectedGender==="female"?"selected":""}`}>
                    <span className="label-text">Female</span>
                    <input type="checkbox" className="checkbox border-2 border-slate-900 " checked={selectedGender==="female"} onChange={()=>onhandleCheck("female")}/>
                </label>
        </div>
    </div>
  )
}

export default GenderCheckBox


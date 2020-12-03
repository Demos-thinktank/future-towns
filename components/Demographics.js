import React, {useState} from 'react'
import RoseDiagram from './RoseDiagram'

const Demographics = ({group}) => {
    const [selectedGroup, setSelectedGroup] = useState(group)
    const [selectedCategory, setSelectedCategory] = useState('Age')

    // console.log(group)
    
    function onChangeValue(e) {
    // console.log(e.target.value);
    setSelectedCategory(e.target.value)
  }

  function handleSelect (e) {
      setSelectedGroup(e.target.value)
  }
    return (
        <div>
        <div className='container'>
            <p className='subheading'>SELECT A GROUP AND A CATEGORY TO EXPLORE THE DEMOGRAPHIC BREAKDOWN OF THE TWO TOWN GROUPS. HOVER OVER OR CLICK ON THE CHART TO SEE MORE.</p>
            <div style={{display: 'flex'}}>
            <button value='A' className={`btnA ${selectedGroup === 'A' && 'selected-group'}`} onClick={handleSelect}>EARLY ADOPTERS</button>
            <button value='B' className={`btnB ${selectedGroup === 'B' && 'selected-group'}`} onClick={handleSelect}>PRESERVERS</button>
            </div>
            <div onChange={onChangeValue} className='radioBtn_container'>
            <label>Age{' '}
            <input type='radio' value='Age' name='options' defaultChecked='checked' />
            </label>
            <label>Region{' '}
            <input type='radio' value='Region' name='options'/>
            </label>
            <label>EU Referendum vote{' '}
            <input type='radio' value='EU Referendum vote' name='options'/>
            </label>
            <label>Future voting intention{' '}
            <input type='radio' value='Future voting intention' name='options'/>
            </label>
            </div>
          </div>
          <div className='pieChart'>
            <RoseDiagram selectedGroup={selectedGroup} selectedCategory={selectedCategory} style={{marginBottom: '5rem'}}/>
          </div>   
             <style jsx>{`
            .selected-group {
              background-color: #1d3336 !important;
              color: white !important;
            }

            .container {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .pieChart {
              margin: 1rem 0 3rem 0;
              border: 1px solid rgb(29, 51, 54);
              border-radius: 15px;
              box-shadow: rgb(29, 51, 54) 1px 1px 6px;
              overflow: hidden;
            }
            .btnA {
              padding: 0.5rem 0.5rem 0.5rem 1rem;
              font-weight: bold;
              background-color: rgba(191, 198, 207, 0.6);
              border: 1px solid #1d3336;
              border-radius: 25px 0 0 25px;
              color: #676C72;
              // margin: 0px 1ch;
            }
            .btnB {
              padding: 0.5rem 1rem;
              font-weight: bold;
              background-color: rgba(191, 198, 207, 0.6);
              border: 1px solid #1d3336;              
              border-radius: 0 25px 25px 0;
              color: #676C72;
              // margin: 0px 1ch;
            }
            .radioBtn_container {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              margin-top: 0.5rem
            }
            .radioBtn_container > label {
              margin: 12px;
              font-weight: bold;
            }
            input[type="radio" i] {
              background-color: purple !important;  
            }
            .subheading {
              margin: 1rem auto;
              font-size: 1rem;
              font-weight: normal;
              text-align: center;
              max-width: 798px;
            }
      `}</style>
        </div>
    )
}

export default Demographics

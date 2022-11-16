import { useState } from 'react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AnswerOption(props) {
  const [checked, setChecked] = useState(false);

  const handleChecked = (option) => {
    setChecked(!checked);
  }

  return (

        <div  className={classNames(
          checked ? 'border-indigo-300 ring-1 ring-indigo-300' : '',
          'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:space-between focus:outline-none'
        )
      } onClick= {() => handleChecked(props?.option)}>

            <div className="flex items-center h-5">
                <input
                    type="checkbox"
                    onChange={() => handleChecked(props?.option)}
                    checked={checked}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"     
                />
            </div>
            <div className="ml-3 text-sm">
                <label className="font-normal text-gray-700">
                    {props?.option.answerText}
                </label>
                
            </div>
        </div>
    
  )
}

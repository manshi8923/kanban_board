import React,{useState} from 'react'
import { useFunctions } from '../../components/Datacontext/DataProvder';
function SortDropdown() {
    const{setGrouping,finaldata,ticketdata,setSorting,sorting}=useFunctions();
    const [selectedOption, setSelectedOption] = useState(sorting);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setSorting(event.target.value);
    };
    // console.log(finaldata);
    return (
        <div className="dropdown-main">
            <label>
                <input
                    type="radio"
                    value="priority"
                    checked={selectedOption === 'priority' }
                    onChange={handleOptionChange}
                />
                Priority
            </label>
            <br />

            <label>
                <input
                    type="radio"
                    value="title"
                    checked={selectedOption === 'title'}
                    onChange={handleOptionChange}
                />
                Title
            </label>
            <br />

            {/* <label>
                <input
                    type="radio"
                    value="option3"
                    checked={selectedOption === 'option3'}
                    onChange={handleOptionChange}
                />
                Option 3
            </label> */}

            {/* <p>Selected option: {selectedOption}</p> */}
        </div>
    );
}

export default SortDropdown
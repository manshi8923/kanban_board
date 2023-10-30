import React,{useState} from 'react'
import { useFunctions } from '../../components/Datacontext/DataProvder';
function UserDropdown() {
    const [selectedOption, setSelectedOption] = useState('status');
    const {setGrouping}=useFunctions();
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setGrouping(event.target.value);
    };

    return (
        <div className="dropdown-main">
            <label htmlFor='status'>
                <input
                    type="radio"
                    id="status"
                    value="status"
                    checked={selectedOption === 'status'}
                    onChange={handleOptionChange}
                />
                status
            </label>
            <br />

            <label htmlFor='user'>
                <input
                    type="radio"
                    id="user"
                    value="user"
                    checked={selectedOption === 'user'}
                    onChange={handleOptionChange}
                />
                user
            </label>
            <br />

            <label htmlfor="priority">
                <input
                    type="radio"
                    id="priority"
                    value="priority"
                    checked={selectedOption === 'priority'}
                    onChange={handleOptionChange}
                />
                Priority
            </label>

            {/* <p>Selected option: {selectedOption}</p> */}
        </div>
    );
}

export default UserDropdown
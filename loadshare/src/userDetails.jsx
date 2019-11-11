import React, {useState, createElement} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
const axios = require('axios').default;
const writeJsonFile = require('write-json-file');

function UserDetails() {
    /* setting up the states and the initial values */ 
    const [customerId, setCustomer] = useState(0);
    const [data, setData] = useState({});
    const [isActive, setIsActive] = useState(true);
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [custName, setCustName] = useState('');
    const [custActive, setCustActive] = useState('');
    const [branch,setBranch] = useState([]);
    let elements = [],
        options = [];
    
    /* Hook for making the API call for reading json file for initial data */ 
    React.useEffect(() => {
        axios.get('./data.json')
            .then( response => {
                setData(response.data);
                setIsActive(response.data.isActive);
                setMobile(response.data.contactDetails.mobile);
                setEmail(response.data.contactDetails.email);
                setCustName(response.data.customers[0].name);
                setCustActive(response.data.customers[0].isActive);
                
            })

            
      }, []);

    /* function to create branch name list for the dropdown options */ 
    function x(element) {
        debugger;
        data[element].forEach(option => {
            options.push(<Dropdown.Item key={option} >{option}</Dropdown.Item>);
        })
        return options;
        
        
        
    }

    function createElement(jsonData,element) {
        // x(element);
        switch(typeof(jsonData[element])) {
            case 'boolean':
                elements.push (
                    <Form.Group controlId="formBasicActive">
                        <Form.Label>{element}</Form.Label>
                        <Form.Control type="checkbox" placeholder="Name" name={element}  checked={jsonData[element]} onChange={handleInputChange}/>
                    </Form.Group>
                )
                break;

            case 'string':
                elements.push (
                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>{element}</Form.Label>
                        <Form.Control type="text" placeholder={element} name={element} value={jsonData[element]} onChange={handleInputChange}/>
                    </Form.Group>
                )
                break;

            case 'object':
                if(Array.isArray(jsonData[element]) && typeof(data[element][0]) === 'string') {
                   
                    elements.push(
                        <Form.Group controlId="formBasicBranch">
                            <Dropdown>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                    {element}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                {
                                     x(element)
                                }
                                </Dropdown.Menu>
                            </Dropdown>
                       </Form.Group>
                    )
                }
                else if(Array.isArray(jsonData[element]) && typeof(data[element][0]) === 'object') {
                    
                }
                else{
                    Object.keys(jsonData[element]).forEach(innerElement => {
                        elements.push (
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>{innerElement}</Form.Label>
                                <Form.Control type="text" placeholder={innerElement} name={innerElement} value={jsonData[element][innerElement]} onChange={handleInputChange}/>
                            </Form.Group>
                        )
                    })
                }

                break;
            case 'number':
                    elements.push  (
                                <Form.Group controlId="formBasicId">
                                    <Form.Label>{element}</Form.Label>
                                    <Form.Control type="text" placeholder={element} value={jsonData[element]} disabled/>
                                </Form.Group>  
                            )  
                    break;        
        }
    }

      function findElement(jsonData) {
          let secondlevel = [];
        Object.keys(jsonData).forEach(element => {
            // if(typeof(jsonData[element]) === 'object' && Array.isArray(jsonData[element] === true)){
            //     secondlevel.push(element);
            // }
            // else{
                createElement(jsonData,element);
            // }
            
            
        });
        return elements;
        
      }

      function handleInputChange () {

      }

      function handleFormSubmit() {

      }

      function createBranchList() {

      }

      function createCustomerList() {}

      function createServiceList(){}
    
    return(
        <div className='container-fluid'>
        {
            data.contactDetails && data.branches && data.customers ?
            <div className='row'>
                <div className="col-md-2"></div>
                <div className="col-md-5">
                <Form onSubmit={handleFormSubmit}>
                    {findElement(data)}
                  
                   

                    <Button variant="info" type="submit" onSubmit={handleFormSubmit}>
                    Submit
                    </Button>
                    </Form>
                </div>
                
            </div>
        : <p>Error: We encountered an error in fetching the data.</p>
        }
        </div>
        
    )
}

export default UserDetails

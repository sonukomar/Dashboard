import React, {useState} from 'react';

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

    /* function to display information about the selected client */ 
    function selectCustomer(e) {
        let customerLists = [];
        data.customers.forEach(cust => {
            customerLists.push(cust.name);
        })
        let index = customerLists.indexOf(e.currentTarget.innerText);
        var customerId = index === -1 ? 0 : index;
        setCustomer(customerId);
        
    }
    /* function to create branch name list for the dropdown options */ 
    function createBranchList() {
        let branchList = []
        data.branches.forEach(branch => {
            branchList.push(<Dropdown.Item key={branch} >{branch}</Dropdown.Item>);
        })
        return branchList;
    }
    /* function to make customer list for the dropdown options */
    function createCustomerList() {
        let customerList = [];
        data.customers.forEach(customer => {
            customerList.push(<Dropdown.Item key ={customer.name} onClick={selectCustomer}>{customer.name}</Dropdown.Item>);
        })
        return customerList;
    }

    /* function to create list of services provided by the clients*/ 
    function createServiceList(){
        let serviceList = [];
        data.customers[customerId].services.forEach((service,index) => {
            serviceList.push(<Form.Control type="text" placeholder="Name" name={"service"+index} value={service} onChange={handleInputChange}/>)
        })
        return serviceList;
    }
    /* function to do processing of data when form is submitted */ 
    function handleFormSubmit(e){
        e.preventDefault();
        let payload = _preparePayload();
        _writeJsonFile(payload);
        

          
    }
    /* An utility function for writting data to json file on the disk */ 
    function _writeJsonFile(data) {
        var fs = require('fs');
        fs.writeFile ("input.json", JSON.stringify(data), function(err) {
            if (err) throw err;
            console.log('complete');
            alert('complete');
            }
        );
    }
    /* An utility function for preparing the json file based on the changes made by user */ 
    function _preparePayload() {
        let payload = {
            "id": 1,
            "name": "Loadshare Networks",
            "isActive": isActive,
            "contactDetails": {
            "mobile": mobile,
            "email": email
            },
            "branches": [
            "Bangalore",
            "Guwahati",
            "Delhi"
            ],
            "customers": [
                {
                "name": "Flipkart",
                "active": true,
                "services": [
                "LINE_HUAL",
                "LAST_MILE"
                ]
                },
                {
                "name": "Swiggy",
                "active": true,
                "services": [
                "HYPER_LOCAL"
                ]
                },
                {
                "name": "Paytm",
                "active": true,
                "services": [
                "FIRST_MILE",
                "LINE_HUAL"
                ]
                }
                ]
            }

            console.log(payload);
            return payload;
    }
    /* function to be excuted when user changes any values in the fields */ 
    function handleInputChange(e, value){
        
        switch(e.currentTarget.name){

            case 'isActive':
                setIsActive(e.currentTarget.form[2].value);
                break;

            case 'mobile':
                setMobile(e.currentTarget.form[3].value);
                break;

            case 'email':
                setEmail(e.currentTarget.form[4].value);
                break;

            case 'custName':
                setCustName(e.currentTarget.form[7].value);
                break;

            case 'custIsActive':
                setCustActive(e.currentTarget.form[8].value);
                break;

            case 'service':
                break;

            default:
                break;

        }
        

    }
    
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
    
    return(
        <div className='container-fluid'>
        {
            data.contactDetails && data.branches && data.customers ?
            <div className='row'>
                <div className="col-md-2"></div>
                <div className="col-md-5">
                <Form onSubmit={handleFormSubmit}>

                    <Form.Group controlId="formBasicId">
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" placeholder="ID" value={data.id} disabled/>
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={data.name} disabled/>
                    </Form.Group>

                    <Form.Group controlId="formBasicActive">
                        <Form.Label>Is Active</Form.Label>
                        <Form.Control type="checkbox" placeholder="Name" name="isActive"  checked={isActive} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Name" name="mobile" value={mobile} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email" name="email" value={email} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicBranch">
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Branch
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    createBranchList()
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <hr />
                    <p>Customer Information :</p>
                    <Form.Group controlId="formBasicCustomer">
                    <Form.Text className="text-muted">
                            Please select customer from dropdown
                        </Form.Text>
                    <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                {data.customers[customerId].name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    createCustomerList()
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group controlId="formBasicCustomerName">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" name="custName"  value={custName} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCustomerActive">
                        <Form.Label>IS Active</Form.Label>
                        <Form.Control type="text" placeholder="Name" name="custIsActive" value={custActive} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCustomerServices">
                        <Form.Label>Services</Form.Label>
                        {
                            createServiceList()
                        }
                    </Form.Group>

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

import React, {useState} from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
const axios = require('axios').default;

function UserDetails() {
    const [customerId, setCustomer] = useState(0);
    const [payload, setPayload] = useState({});
    const [data, setData] = useState({});
    const [customerList, setCustList] = useState([]);


    function selectCustomer(e) {
        let customerLists = [];
        data.customers.forEach(cust => {
            customerLists.push(cust.name);
        })

        let index = customerLists.indexOf(e.currentTarget.innerText);
        var customerId = index === -1 ? 0 : index;
        setCustomer(customerId);
        alert(customerId);
    }
    function createBranchList() {
        let branchList = []
        data.branches.forEach(branch => {
            branchList.push(<Dropdown.Item key={branch} >{branch}</Dropdown.Item>);
        })
        return branchList;
    }

    function createCustomerList() {
        let customerList = [];
        data.customers.forEach(customer => {
            customerList.push(<Dropdown.Item key ={customer.name} onClick={selectCustomer}>{customer.name}</Dropdown.Item>);
        })
        return customerList;
    }

    function createServiceList(){
        let serviceList = [];
        data.customers[customerId].services.forEach(service => {
            serviceList.push(<Form.Control type="text" placeholder="Name" value={service} onChange={handleInputChange}/>)
        })
        return serviceList;
    }

    function handleFormSubmit(e){
        debugger;
        e.preventDefault();
        console.log('form submitted')
    }

    function handleInputChange(){
        debugger;
        console.log('input change');
    }
    
    React.useEffect(() => {
        axios.get('./data.json')
            .then( response => {
                setData(response.data);
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
                        <Form.Control type="checkbox" placeholder="Name" checked={data.isActive} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={data.contactDetails.mobile} onChange={handleInputChange}/>
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
                        <Form.Control type="text" placeholder="Name" value={data.customers[customerId].name} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCustomerActive">
                        <Form.Label>IS Active</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={data.customers[customerId].active} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicCustomerServices">
                        <Form.Label>Services</Form.Label>
                        {
                            createServiceList()
                        }
                    </Form.Group>

                    <Button variant="primary" type="submit" onSubmit={handleFormSubmit}>
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

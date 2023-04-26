import React from "react";
import { useQuery } from "react-query";
import Table from 'react-bootstrap/Table';
import {Dropdown, DropdownButton} from "react-bootstrap";
import {API} from "../config/api";

function Transaction(){
    let { data: transaction } = useQuery('transaction', async () => {
        const response = await API.get('/transactions');
        return response.data.data;
    });
    console.log(transaction)

    const Statuspayment = ({ status }) => {
        switch (status) {
            case "pending":
                return <p className='text-orange-500'>Pending</p>
            case "success":
                return <span className='text-green-700'>Success</span>
            case "failed":
                return <span className='text-red-500'>Failed</span>
            default: return
        }
    }

    return(
        <div className="bg-dark">
            <div className="container p-5" >
            <h1 className="text-light">Incoming Transaction</h1>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr className="text-danger">
                    <th>No</th>
                    <th>User</th>
                    <th>Remaining Active</th>
                    <th>Status User</th>
                    <th>Status Payment</th>
                </tr>
            </thead>
            <tbody>
            {transaction?.map((data, i) => {
                return (
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.user.fullname}</td>
                        <td>{data.endDate.split("T")[0]}</td>
                        <td className="text-success">Active</td>
                        <td className="text-success">{data.status}</td>
                    </tr>
                )
            })}
            </tbody>
            </Table>
        </div>
        </div>
    );
}

export default Transaction;
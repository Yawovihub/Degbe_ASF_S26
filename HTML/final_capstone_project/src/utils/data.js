import {useState} from "react";

const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Administrator', status: 'Active', joined: 'Oct 24, 2025' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Inactive', joined: 'Nov 12, 2025' },
]);
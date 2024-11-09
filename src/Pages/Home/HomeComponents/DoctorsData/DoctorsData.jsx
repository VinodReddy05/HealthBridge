// import supabase from "../../DataBase/DataBase"
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import DoctorCard from "./DoctorCard";
// import supabase from "../../../../utilies/SupaBase";

import "./DoctorsData.scss"
import PatientInfo from "../PatientInfo/PatientInfo";
// import supabase from "../../../../utilies/SupaBase";


const supabaseUrl = 'https://exdhwtkeippsrxikocxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGh3dGtlaXBwc3J4aWtvY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NTU5NjAsImV4cCI6MjA0NjUzMTk2MH0.HaP4b7kvy3YrdNh8p8tgShgRLyjj2zpCNx1JTIY0upQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const DoctorsData = () => {
    const [fetchError, setFetchError] = useState(null);
    const [doctors, setDoctors] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            const { data, error } = await supabase
                .from('DoctorsData')
                .select();

            if (error) {
                setFetchError("Could not fetch data");
                setDoctors(null);
            } else {
                setDoctors(data);
                setFetchError(null);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="DoctorsData">
           <div className="doctorFetch">
           {fetchError && <p>{fetchError}</p>}
            {doctors && (
                <div className="doctors">
                    <div className="doctors-gird">
                    {doctors.map(doctor =>(
                       <DoctorCard key={doctor.id} doctor={doctor}/>

                    ))}
                    </div>
                </div>
        
            )}
           </div>

           <div className="patientDIV">
           <PatientInfo/>
           </div>
        </div>
    );
};

export default DoctorsData;





// import { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl2 = 'https://ipxmgiyclcnwcewpjrju.supabase.co';
// const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlweG1naXljbGNud2Nld3Bqcmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxOTg0MjIsImV4cCI6MjA0NTc3NDQyMn0.J6RvC0zpQHO-aKVcO0s0V-BVP3tGBfDmm0KCTtHRl0E';
// const supabase2 = createClient(supabaseUrl, supabaseAnonKey);

// function App() {
//     const [todos, setTodos] = useState([]);
//     const [newTodo, setNewTodo] = useState('');
//     // const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchTodos();
//     }, []);

//     const fetchTodos = async () => {
//         // setLoading(true);
//         const { data, error } = await supabase.from('todos').select('*');
//         if (error) console.error(error);
//         else {
//             setTodos(data);
//             fetchTodos();
//             // setLoading(false);
//         }
//     };

//     const addTodo = async () => {
//         if (!newTodo) return;
//         const { data, error } = await supabase.from('todos').insert([{ text: newTodo }]);
//         if (error) console.error(error);
//         else {
//             setTodos([...todos, ...data]);
//             setNewTodo('');
//         }
//     };

//     const deleteTodo = async (id) => {
//         const { error } = await supabase.from('todos').delete().eq('id', id);
//         if (error) console.error(error);
//         else setTodos(todos.filter(todo => todo.id !== id));
//     };

//     const toggleComplete = async (id, isComplete) => {
//         const { error } = await supabase.from('todos').update({ is_complete: !isComplete }).eq('id', id);
//         if (error) console.error(error);
//         else fetchTodos();
//     };

//     // if (loading) return <div>Loading...</div>;

//     return (
//         <div>
//             <h1>Todo App</h1>
//             <input
//                 type="text"
//                 value={newTodo}
//                 onChange={(e) => setNewTodo(e.target.value)}
//                 placeholder="Add a new todo"
//             />
//             <button onClick={addTodo}>Add Todo</button>
//             <ul>
//                 {todos.map(todo => (
//                     <li key={todo.id}>
//                         <span
//                             onClick={() => toggleComplete(todo.id, todo.is_complete)}
//                             style={{ textDecoration: todo.is_complete ? 'line-through' : 'none' }}
//                         >
//                             {todo.text}
//                         </span>
//                         <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;
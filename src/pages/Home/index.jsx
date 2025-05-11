import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.png";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  //GET
  async function getUsers() {
    const usersFrom = await api.get("/users");

    setUsers(usersFrom.data);
  }

  //POST
  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
  }

  //DELETE
  async function deleteUsers(id) {
    await api.delete(`/users/${id}`, {});
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Users registration</h1>
        <input type="text" name="name" placeholder="name" ref={inputName} />
        <input type="number" name="age" placeholder="age" ref={inputAge} />
        <input type="email" name="email" placeholder="email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          Registration
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p>
              Age: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;

import { useState ,useEffect }  from "react";
import "./App.css";
import  List  from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};


function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };


 const showAlert = (show = false, type = "", msg = "") => {
   setAlert({ show, type, msg });
 };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };


 const removeItem = (id) => {
   showAlert(true, "danger", "item removed");
   setList(list.filter((item) => item.id !== id));
 };


 const editItem = (id) => {
   const specificItem = list.find((item) => item.id === id);
   setIsEditing(true);
   setEditID(id);
   setName(specificItem.title);
 };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);


  return (
    <div className="mx-2   ">
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <p className="mt-10 flex justify-center  font-bold text-lg ">
          To Do List
        </p>
        <div className="lg:mx-20 p-5 flex justify-center items-center  font-bold text-lg ">
          <input
            value={name}
            type="text"
            className="w-full  p-2  pl-2 border-2 rounded-sm  "
            placeholder="e.g Study"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-[#001d3d] text-white hover:bg-green-900 p-2 rounded-sm" type="submit">
            {isEditing ? "Edite" : "Submit"}
          </button>
        </div>
      </form>

      <div>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />

            <div className="p-5 flex justify-center items-center">
              <button
                className="font-bold p-2 bg-[#001d3d] text-red-700 hover:bg-red-700 hover:text-white  rounded-sm px-2"
                onClick={clearList}
              >
                Clear Items
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

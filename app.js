const responseDiv = document.getElementById("response-div");
const resultDiv = document.getElementById("result-div");
let users = [];

const getUsers = () => {
  const URL = "https://aribanode.herokuapp.com/users";

  axios.get(URL).then((response) => {
    users = response.data;

    if (response.data.length === 0) {
      responseDiv.innerHTML = "No Users";
    } else {
      responseDiv.innerHTML = "";

      const usersList = users.map((user, index) => {
        return `<tr><td>${index}</td><td>${user.name}</td><td>${user.email}</td><td>${user.address}</td><td><button class="btn btn-primary" onclick="editUser('${user._id}', ${index})">Edit</button></td><td><button class="btn btn-danger" onclick="deleteUser('${user._id}')">Delete</button></td></tr>`;
      });

      resultDiv.innerHTML = "";

      resultDiv.innerHTML = usersList.join("");
    }
  });
};

getUsers();

const addUser = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const addUserURL = "https://aribanode.herokuapp.com/user";

  if (name === "" || email === "" || address === "") {
    alert("Please Fill All the Fields");
  } else {
    const userData = {
      name: name,
      email: email,
      address: address,
    };

    axios.post(addUserURL, userData).then((response) => {
      alert(`${userData.name} is Added`);
      getUsers();
      const name = (document.getElementById("name").value = "");
      const email = (document.getElementById("email").value = "");
      const address = (document.getElementById("address").value = "");
    });
  }
};


  axios.put(updateUserURL, userData).then((res) => {
    alert(`${userData.name} is Updated`);
    getUsers();
  });

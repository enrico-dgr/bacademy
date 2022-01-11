import React, { Component } from "react";

import Input from "../../funcComponents/Input/Input";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.list = props.list;

    this.state = {
      text: "",
      queryType: "name",
    };
  }

  loggerEvent = (e) => console.log(e.pageX, e.pageY);

  componentDidMount() {
    window.addEventListener("click", this.loggerEvent);
    console.log("Event added on mount");
  }

  filter = (user) => {
    if (this.state.text === "") {
      return true;
    }
    return user[this.state.queryType] === this.state.text;
  };

  onChangeInput = (e) => {
    this.setState({ text: e.target.value });
  };

  onChangeSelect = (e) => {
    this.setState({ queryType: e.target.value });
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.loggerEvent);
    console.log("Event removed on unmount");
  }

  render() {
    return (
      <div>
        <div>
          <Input
            value={this.state.text}
            onChange={this.onChangeInput}
            style={{ width: 100 }}
            animation={false}
          />
          <select
            name="query-type"
            id="query-type"
            value={this.state.queryType}
            onChange={this.onChangeSelect}
          >
            <option value="name">By name</option>
            <option value="dateOfBirth">By date of birth</option>
            <option value="hometown">By hometown</option>
          </select>
        </div>
        <div>{this.list.filter(this.filter).map(this.User)}</div>
      </div>
    );
  }

  User = (user, i) => {
    return (
      <div
        key={i + "_example-page_users-list"}
        style={{
          border: "1px solid black",
          width: "max-content",
          minWidth: 200,
          height: "max-content",
          minHeight: 120,
        }}
      >
        <p>Name: {user.name}</p>
        <p>Born in: {user.dateOfBirth}</p>
        <p>Living in: {user.hometown}</p>
      </div>
    );
  };
}

UsersList.defaultProps = {
  list: [
    {
      name: "Giorgio",
      dateOfBirth: "16/07/1990",
      hometown: "Roma",
    },
    {
      name: "Enrico",
      dateOfBirth: "05/04/1998",
      hometown: "Catania",
    },
    {
      name: "Luca",
      dateOfBirth: "19/03/1994",
      hometown: "Napoli",
    },
    {
      name: "Andrea",
      dateOfBirth: "26/09/1992",
      hometown: "Roma",
    },
    {
      name: "Piero",
      dateOfBirth: "16/07/1990",
      hometown: "Torino",
    },
  ],
};

export default UsersList;

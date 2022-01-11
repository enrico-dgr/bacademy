/**
 * - button
 * - checkbox
 * - loader
 * - modal
 * - textarea
 */
import React, { Component } from "react";

import Button from "../components/funcComponents/Button/Button";
import Card from "../components/funcComponents/Card/Card";
import Checkbox from "../components/funcComponents/Checkbox/Checkbox";
import Input from "../components/funcComponents/Input/Input";
import Loader from "../components/funcComponents/Loader/Loader";
import Modal from "../components/funcComponents/Modal/Modal";
import Textarea from "../components/funcComponents/Textarea/Textarea";
import UsersList from "../components/classComponents/UsersList/UsersList";

class ExamplePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderModal: false,
      text: "",
      check: false,
    };
  }

  onClickHandler = () => {
    console.log("Button in Card");
  };

  onClickHandlerShowModal = () => {
    this.setState({ renderModal: true });
  };
  onClickHandlerHideModal = () => {
    this.setState({ renderModal: false });
  };

  onChangeHandler = (e) => {
    this.setState({ text: e.target.value });
  };

  onCheckHandler = (c) => {
    this.setState({ check: c });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Card>
          <p>Checkbox</p>
          <Input type={"checkbox"} />
        </Card>
        <Card>
          <p>Button</p>
          <Button
            text={"Press the button"}
            onClickHandler={this.onClickHandler}
          />
        </Card>
        <Card>
          <p>Modal</p>
          <Button
            text={"Show the modal"}
            onClickHandler={this.onClickHandlerShowModal}
          />
          <Modal render={this.state.renderModal}>
            <h1>Modal</h1>
            <p>A beautiful modal</p>
            <Button
              text={"Close modal"}
              onClickHandler={this.onClickHandlerHideModal}
            />
          </Modal>
        </Card>
        <Card>
          <p>Textarea</p>
          <Textarea
            text={this.state.text}
            onChangeHandler={this.onChangeHandler}
          />
        </Card>
        <Card>
          <p>Loader</p>
          <Loader />
        </Card>
        <Card>
          <p>Checkbox</p>
          <p>{this.state.check + ""}</p>
          <Checkbox onCheckHandler={this.onCheckHandler} />
        </Card>
        <Card>
          <p>Users list</p>
          {!this.state.check && <p>(click on checkbox)</p>}
          {this.state.check && <UsersList />}
        </Card>
      </div>
    );
  }
}

export default ExamplePage;

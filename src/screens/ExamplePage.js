import Button from "../components/funcComponents/Button/Button";
import Card from "../components/funcComponents/Card/Card";
import Checkbox from "../components/funcComponents/Checkbox/Checkbox";
import Input from "../components/funcComponents/Input/Input";
import Loader from "../components/funcComponents/Loader/Loader";
import Modal from "../components/funcComponents/Modal/Modal";
/**
 * - button
 * - checkbox
 * - loader
 * - modal
 * - textarea
 */
import React from "react";
import Textarea from "../components/funcComponents/Textarea/Textarea";

const ExamplePage = () => {
  const [renderModal, setRenderModal] = React.useState(false);
  const [text, setText] = React.useState("");
  const [check, setCheck] = React.useState(false);

  const onClickHandler = () => {
    console.log("Button in Card");
  };

  const onClickHandlerShowModal = () => {
    setRenderModal(true);
  };
  const onClickHandlerHideModal = () => {
    setRenderModal(false);
  };

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const onCheckHandler = (c) => {
    setCheck(c);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Card>
        <p>Checkbox</p>
        <Input type={"checkbox"} />
      </Card>
      <Card>
        <p>Button</p>
        <Button text={"Press the button"} onClickHandler={onClickHandler} />
      </Card>
      <Card>
        <p>Modal</p>
        <Button
          text={"Show the modal"}
          onClickHandler={onClickHandlerShowModal}
        />
        <Modal render={renderModal}>
          <h1>Modal</h1>
          <p>A beautiful modal</p>
          <Button
            text={"Close modal"}
            onClickHandler={onClickHandlerHideModal}
          />
        </Modal>
      </Card>
      <Card>
        <p>Textarea</p>
        <Textarea text={text} onChangeHandler={onChangeHandler} />
      </Card>
      <Card>
        <p>Loader</p>
        <Loader />
      </Card>
      <Card>
        <p>Checkbox</p>
        <p>{check + ""}</p>
        <Checkbox onCheckHandler={onCheckHandler} />
      </Card>
    </div>
  );
};

export default ExamplePage;

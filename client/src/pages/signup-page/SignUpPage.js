import React, { useState, useRef } from "react";
import { Typography, Modal, Steps, Carousel } from "antd";
import { connect } from "react-redux";
import WrappedSignupForm from "../../components/signup-form/SignupForm";
import WrappedSigninForm from "../../components/signin-form/SigninForm";
import { signup, signupExpert } from "../../actions/auth-actions/actions";
import { signin } from "../../actions/auth-actions/actions";
import { createProfile } from "../../actions/profile-actions/actions";
import Profile_builder from "../../components/Profile-Builder/Profile-builder";
import Expertcaro from "../../components/expertSignUpCaro/Expertcaro";
import img from '../../images/user3.png';
import img2 from '../../images/user2.png';
import "./signup-page.scss";

const SignUpPage = props => {
  const [nextstep, setNextstep] = useState(0);
  const [signupexpert, setSignupexpert] = useState(false);
  const refsigntupexpert = useRef();
  const refInput = useRef();
  const { Step } = Steps;
  const handleCancel = () => {
    props.setShowmodel(false);
    setSignupexpert(false);
    refInput.current.goTo(0);
  }
  const handle = (e) => {
    e.preventDefault();
    console.log("clicked")
    setNextstep(nextstep + 1);
    console.log(refInput.current);
    refInput.current.next();
  }
  const handlesignupexpert = (e) => {
    e.preventDefault();
    console.log('lena')
    setNextstep(nextstep + 1);
    refsigntupexpert.current.next();
  }

  function onChange(a) {
    console.log(a);
    console.log(refsigntupexpert.current);
  }

  const [data, setData] = useState(null);
  const sing_up_client = () => {
    console.log(refInput.current);
    setSignupexpert(false);
    refInput.current.next();
  }
  const sing_up_expert = () => {
    console.log(refInput.current);
    setSignupexpert(true);
    refInput.current.next();
  }
  return (
    <Modal centered onCancel={handleCancel} visible={props.showmodel} footer={null}>
      <Carousel dots={false} ref={refInput} afterChange={onChange} >
        <div className="signup-page">
          <Typography.Title className="title">Sign up</Typography.Title>
          <div className="content">
            <WrappedSigninForm setShowmodel={props.setShowmodel} showmodel={props.showmodel} signin={props.signin} />
          </div>
          <div className="singupicons">
            <div onClick={sing_up_client} className="border__shadow">
              <img src={img} className="imgg" />
              <h5>SignUp Client</h5>
            </div>
            <div onClick={sing_up_expert} className="border__shadow">
              <img src={img2} className="imgg2" />
              <h5>SignUp Expert</h5>
            </div>
          </div>
        </div>
        {signupexpert ?
          <Expertcaro signup={props.signup} signupExpert={props.signupExpert} createProfile={props.createProfile} />
          :
          <div className="signup-page">
            <Typography.Title className="title">Sign up</Typography.Title>
            <div className="content">
              <WrappedSignupForm refInput={refInput} handle={handle} signupExpert={props.signup} setData={setData} />
            </div>
          </div>
        }
      </Carousel>
    </Modal>

  );
};

export default connect(
  null,
  { signup, signupExpert, createProfile, signin }
)(SignUpPage);

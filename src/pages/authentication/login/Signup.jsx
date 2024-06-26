import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authentication from "../../../assets/others/authentication.png";
import authentication1 from "../../../assets/others/authentication2-removebg-preview.png";
import { AuthContext } from "../../../authProvider/AuthProvider";
import SocialSignin from "../../../components/socialSignIn/SocialSignin";
import auth from "../../../firebase/firebase.config";

const Signup = () => {
  const { signupUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    signupUser(email, password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign Up Success",
          showConfirmButton: false,
          timer: 1500,
        });
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        navigate("/");
      })
      .then((err) => console.log(err));
  };

  return (
    <div
      className="min-h-screen flex items-center"
      style={{ backgroundImage: `url(${authentication})` }}
    >
      <div
        className="flex flex-col lg:flex-row-reverse justify-between items-center pb-10 mx-auto max-h-[600px] w-[80%]"
        style={{ boxShadow: `10px 10px 10px 10px rgba(0, 0, 0, 0.25)` }}
      >
        <div className="w-1/2">
          <img src={authentication1} alt="" />
        </div>
        <div className="card w-full max-w-sm mx-auto">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center ">Sign Up Now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-2">
              <button className="btn bg-[#D1A054B3]" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <SocialSignin />
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, {useState} from "react";
import eye from "./image/eye.png";
import actipace from "./image/actipace.png";
import {useLocation, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {categories} from "../../services/Api";


const Login = () => {
    const navigate = useNavigate();


    //const [token,setToken] = useRecoilState(TokenAtoms)
    //console.log("tooooo",token);

    // const {token} = useSelector((state) => state.auth)
    //console.log(token);
    //const dispatch = useDispatch();


    const [formData, setData] = useState({email: "", password: "", otp: ""})
    const [flag, setFlag] = useState(true);

    function changehandler(event) {
        setData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(formData);

        const backendcalling = async () => {
            const toastId = toast.loading("loading....")
            try {
                const result = await axios.post(categories.OTPLOGIN_API, formData);
                //console.log(result.data)
                setFlag(false);
                toast.success(`${result.data.message}`, {id: toastId});
            } catch (e) {
                toast.error(e.response.data.message, {id: toastId});
                return;
            }
        }
        backendcalling();
    };

    const handleSsignup = (e) => {
        e.preventDefault();
        //console.log(formData);
        const backendcalling = async () => {
            const toastId = toast.loading("loading....")
            try {
                const result = await axios.post(categories.LOGIN_API, formData);
                //setToken(result.data.token)
                //dispatch(setToken(JSON.stringify(result.data.token)))
                //console.log("api token",result.data.token);
                //console.log("slice tokne",token)
                localStorage.setItem('token', result.data.token);
                //console.log("storage token",localStorage.getItem("token"));

                toast.success(`${result.data.message}`, {id: toastId});

                async function dataFetch() {
                    toast.loading("loading....")

                    try {
                        const response = await axios.get(categories.DASHBOARD, {
                            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                        });

                        const {data} = response;
                        if (data && data.data) {
                            navigate("/dashboard", {state: data}); // Ensure it's an array
                        } else {
                            toast.error("No data found");
                        }
                        toast.dismiss();
                    } catch (e) {
                        if (e.response && e.response.data && e.response.data.message) {
                            toast.error(e.response.data.message); // Show error message from response
                        } else {
                            toast.error("An error occurred"); // Show generic error message
                        }
                    }
                }

                dataFetch();

            } catch (e) {
                toast.error(e.response.data.message, {id: toastId});
                return;
            }
        }
        backendcalling();
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            {flag ? <>
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                    <div className="w-full flex justify-center">
                        <img src={actipace} alt="" className="mx-28 my-4"></img>
                    </div>
                    <h2 className="text-center text-xs font-sm text-gray-700">
                        Access and manage your instances from
                        <br/>
                        this actipace account.
                    </h2>
                    <form className="mt-6" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label
                                htmlFor="dealerCode"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="dealerCode"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={changehandler}
                                required
                                placeholder="Email"
                                className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="flex justify-center h-[45px]">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={changehandler}
                                    required
                                    placeholder="Password"
                                    className="w-full px-4 py-2 mt-2 text-sm border rounded-l-md focus:ring focus:ring-green-200 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className=" cursor-auto inset-y-0 right-2    text-sm text-green-600"
                                >
                                    <img src={eye} alt="" className="w-9 h-9 my-2"></img>
                                </button>
                            </div>
                        </div>
                        <a
                            href="/resetpassword"
                            className="text-sm text-green-600 hover:underline block text-right mb-3"
                        >
                            Reset Password
                        </a>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-green-600 hover:underline">
                            Sign up now
                        </a>
                    </p>
                </div>
            </> : <>
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                    <img src={actipace} alt="" className="mx-28 my-4"></img>
                    <h2 className="text-center text-xs font-sm text-gray-700">
                        Access and manage your instances from
                        <br/>
                        this actipace account.
                    </h2>
                    <form className="mt-6" onSubmit={handleSsignup}>

                        <div className="mb-6">
                            <label
                                htmlFor="code"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Enter Otp
                            </label>
                            <input
                                id="code"
                                type="text"
                                name="otp"
                                required
                                value={formData.otp}
                                onChange={changehandler}
                                placeholder="otp"
                                className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:ring focus:ring-green-200 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                        >
                            Login
                        </button>
                    </form>

                </div>
            </>}

        </div>
    );
};

export default Login;

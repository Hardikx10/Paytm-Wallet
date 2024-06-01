

export default async function () {
    return(
        <div className="bg-purple-150 h-screen flex items-center justify-center">

  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
 
  <div className="mb-6 text-center">
    <h2 className="text-xl font-semibold">Login</h2>
   
  </div>
  <button className="w-full flex items-center justify-center py-2 mb-4 border rounded text-gray-600 border-gray-300 hover:bg-gray-100">
    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-2"/>
    Continue with Google
  </button>
  {/* <!-- OR Line --> */}
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">or</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  <div className="mb-4">
  
    <input type="phonenumber" className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Phone Number"/>
  </div>
  <div className="mb-4">
 
    <input type="password" className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="********"/>
  </div>
  
  <button className="w-full py-2 mb-4 bg-purple-600 text-white rounded hover:bg-purple-800">
    Login
  </button>
  <div className="text-center">
    {/* <p className="text-gray-600">Create a New Account</p> */}
    <button className="w-full py-2 mb-4 bg-black-600 text-purple rounded hover:text-purple-900">
        Create a New Account
  </button>

  </div>
  
</div>
</div>
)}
    
import useSWR from "swr"

export default function LogIn() {

	const handleSubmit = async (event) => {
		event.preventDefault();

    const formData= new FormData(event.target);
    const userData= Object.fromEntries(formData);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!response.ok){
        console.error(`There was an error: ${response.status}`)
    }else{
        console.log("welcome!");
    event.target.reset();
	  }
  }
 	return  (
 		<form onSubmit={handleSubmit}>
 			<label htmlFor="loginEmail">Email Address:</label>
            <input type="email" id="loginEmail" name='email' autoComplete='username' required />
            <label htmlFor="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name='password' autoComplete='current-password' required />
            <button type="submit">Log In</button>

 		</form>
 	)
  }
import * as yup from 'yup'
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// TODO : chercher à proteger le mot de passe, comment faire ça ?
type FormValues =
{
	username : string
	email : string
	password : string
	passwordConfirmation : string
}

const validationSchema = yup.object().shape({
	username : yup.string().required('Username is required'),
	email : yup.string().required("Email is required").email('Email is invalid'),
	password: yup.string().required('Please enter your password')
	.matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
	passwordConfirmation: yup.string()
		.required('Password confirmation is required')
		.oneOf([yup.ref('password'), null], 'Passwords must match')
})

const Authentication = () =>
{
	const { register, handleSubmit, formState : {errors} } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });
	const onSubmit = (data : any) => console.log("data", data);
	
	return <form onSubmit={handleSubmit(onSubmit)}>
		<input type="text" {...register("username")} placeholder="username" />
		{errors.username && <p>{errors.username.message}</p>}
		
		<input type="password" {...register("password")} placeholder="password" />
		{errors.password && <p>{errors.password.message}</p>}

		<input type="password" {...register("passwordConfirmation")} placeholder="passwordConfirmation" />
		{errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}

		<input type="email" {...register("email")} placeholder="email" />
		{errors.email && <p>{errors.email.message}</p>}
		
		<button>Submit</button>
		
		{Object.entries(errors).map(error =>
			<div key={error[0]} >
				{`- ${error[0]} : ${error[1]?.message}`}
			</div>)}
	</form>
}

export default Authentication
import React, { useRef, useState } from "react"
import '../Styles/Forms.css'
import { useAuth } from "../Contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <div className="form">
            <div className="form-body">
                <h2 className="title-color">Sign Up</h2>
                {error && <p id="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        E-mail:
                    </label>
                    <input type="text"
                        id="email"
                        name="email"
                        ref={emailRef}
                        placeholder="Enter your e-mail"
                        required>
                    </input>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password"
                        id="password"
                        name="password"
                        ref={passwordRef}
                        placeholder="Create your password"
                        required>
                    </input>
                    <label htmlFor="password">
                        Password Confirmation:
                    </label>
                    <input type="password"
                        id="password-confirm"
                        name="password-confirm"
                        ref={passwordConfirmRef}
                        placeholder="Confirm your password"
                        required>
                    </input>
                    <button disabled={loading} type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}
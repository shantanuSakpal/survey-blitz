import React from 'react'
import Error from '../images/404-error-page.gif'

export default function ErrorPage() {
    return (
        <div className='errorpage'>
            <img className='err' src={Error} alt=""/>
            <a href="/home">Back Home</a>
        </div>
    )
}

import React from 'react'

const Loader = ({ size = 50, color = 'blue' }) => (
    <div>
        <svg
            width={size}
            height={size}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <circle
                cx="25"
                cy="25"
                r="20"
                stroke={color}
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.25"
            />
            <circle
                cx="25"
                cy="25"
                r="20"
                stroke={color}
                strokeWidth="5"
                strokeDasharray="100"
                strokeDashoffset="75"
                strokeLinecap="round"
                transform="rotate(-90 25 25)"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    </div>
)

export default Loader;

import type { ReactNode } from 'react'
import './DirectionButton.css'

const DirectionButton = ({ label }: { label: string }) => {
    return (
        <button className='btn'>
            <span className="btn-content">
                {label}
            </span>
            <div className="btn-cells">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

        </button>
    )
}

export default DirectionButton


import React from 'react';
import './css/style.css';

export const Pagination = ({
                               amount,
                               currentIndex,
                               onToggle,
                           }) => (
    <div>
        {Array.from({ length: amount }).map((_, i) => (
            <button
                class={i === currentIndex ? "buttonActive" : "button"}
                isCurrent={i === currentIndex}
                onClick={() => {
                    onToggle(i);
                }}
            >
                {i + 1}
            </button>
        ))}
    </div>
);
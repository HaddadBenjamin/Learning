import React, {useRef, useState} from "react";
import "./styles.css";
import {gridElements} from "./grid.data";
import cn from 'classnames';

const GridElement = ({className, title, subtitle, paragraph, description, index}) => {
    const [isHover, setIsHover] = useState(false)
    const descriptionContainerRef = useRef(null)

    return <div className={`grid-item ${className}`}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>

        <div className={cn("title-container", isHover && "animated-title-container")}>
            <div className="title">{title.toUpperCase()}</div>
            <div className="subtitle">{index === 0 ? subtitle : subtitle.toUpperCase()}</div>
            <div className="paragraph">{paragraph}</div>

            <div className="absolute">
                <div
                    className={cn("description-container", isHover && 'description-container-visible')}
                    ref={descriptionContainerRef}>
                    <div className="description">{description}</div>
                    <div className="explore-more-button">Explore More</div>
                </div>
            </div>
        </div>


    </div>
}

const Grid = () =>
    <div className="grid-container">
        {gridElements.map((element, index) => <GridElement {...element} index={index} key={index}/>)}
    </div>

export default Grid
import React, { CSSProperties } from "react";
import './index.less';
import { Card } from "antd";

interface HomeCardProps {
    title?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    borderBottom?: boolean;
    bordered?: boolean;
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
}

const HomeCard: React.FC<HomeCardProps> = (props) => {
    const {
        bordered = true,
        bodyStyle = {},
        style = {}
    } = props;
    return (
        <div className={'home-card-container ' + (bordered ? 'home-card-bordered ' : '') + props.className} style={{...style}}>
            <div className="home-card-head-container">
                <div className={'home-card-head ' + (props.borderBottom ? 'home-card-head-border ' : ' ')}>
                    {props.title}
                </div>
            </div>
            <div className="home-card-body" style={{ ...bodyStyle }}>
                {props.children}
            </div>
        </div>
    )
}


export default HomeCard;
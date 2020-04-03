import React from 'react'

 const Badge = props =>{
    const badgeStyle = props.styles;
    const badgeMainClassName = "badge-main " + props.mainClassName;
    return (
        <div className={badgeMainClassName}>
                        <div className="badge-content" style={badgeStyle}>
                            {props.name}
                        </div>
                    </div>
    );
}

Badge.defaultProps = {
    name: "Name",
    styles: {
         background: "linear-gradient(60deg, #26c6da, #00acc1)",
         boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)"

    }
}

export default Badge;
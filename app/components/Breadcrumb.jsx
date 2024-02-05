import {Link} from '@remix-run/react';

export const Breadcrumb = ({prePage, CurrentPage}) => {
  return (
    <div className="breadcrumb">
      <div className="container">
        <span>
          <Link to="/">Home</Link>
        </span>
        {prePage && (
          <span>
            <Link to="/">{prePage}</Link>
          </span>
        )}
        <span style={{color:"#777", marginLeft:"4px"}} >{CurrentPage}</span>
      </div>
    </div>
  );
};



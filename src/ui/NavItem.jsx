import { NavLink } from "react-router-dom";

function NavItem({ ...props }) {
  return (
    <NavLink
      {...props}
      className="p-3 text-lg rounded-lg hover:bg-slate-200 transition-colors text-slate-800"
    >
      {props.children}
    </NavLink>
  );
}

export default NavItem;

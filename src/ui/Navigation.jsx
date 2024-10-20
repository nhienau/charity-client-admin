import NavItem from "./NavItem";

function Navigation() {
  return (
    <nav className="flex flex-col gap-2 p-2">
      <NavItem to="/app/campaign" title="Chiến dịch">
        Chiến dịch
      </NavItem>
      <NavItem to="/app/lecturer" title="Giảng viên">
        Giảng viên
      </NavItem>
      <NavItem to="/app/donation" title="Quyên góp">
        Quyên góp
      </NavItem>
      <NavItem to="/app/user" title="Người dùng">
        Người dùng
      </NavItem>
    </nav>
  );
}

export default Navigation;

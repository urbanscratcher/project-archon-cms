import TabMenu from './TabMenu';

function Topbar() {
  return (
    <div>
      <TabMenu>
        <TabMenu.Item
          text="profile"
          linkTo="settings/profile"
        />
        <TabMenu.Item
          text="account"
          linkTo="settings/account"
        />
        <TabMenu.Item
          text="display"
          linkTo="settings/display"
        />
      </TabMenu>
    </div>
  );
}

export default Topbar;
